import crypto from 'crypto';
import { trace, getTracer } from './otel';
// import { trace, getTracer } from './otel-sdk';
const tracer = getTracer('my-service-tracer');

import pino from 'pino';

const logger = pino();

const debug = (args: unknown) => {}; //console.log;
const info = console.log;
const min = Math.floor(Date.now() / 60000);

async function ndjson() {
  let url = 'http://uptrace:14318/api/v1/vector/logs';

  const payload = {
    message: 'ndjson-test-' + Math.floor(Date.now() / 60000),
    level: 'error',
    'exception.message': 'error msg',
    'exception.type': 'Error',
    'exception.stacktrace': 'atewaet\nasdfasdf\n',
    host: 'test-error.com',
    'service.name': 'aaa',
    'service.version': '1.1',
    'http.user_agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
    timestamp: new Date().toISOString(),
  };

  const minPayload = {
    message: 'ndjson-test-min-' + Math.floor(Date.now() / 60000),
    // level: "error",
    host: 'testadsfd.com',
    'service.name': 'aaaads',
    'service.version': '1.1',
    timestamp: new Date().toISOString(),
  };

  debug(JSON.stringify(payload));
  let options = {
    method: 'POST',
    headers: {
      'uptrace-dsn': 'http://project2_secret_token@localhost:14318/2',
      'Content-Type': 'application/x-ndjson',
    },
    body: JSON.stringify(minPayload),
  };

  const res = await fetch(url, options);

  info(res.status, res.headers.get('traceparent'));
}

async function sha256(message: string) {
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(message))))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function zipkin() {
  let url = 'http://uptrace:14318/api/v2/spans';
  const uuid = crypto.webcrypto.randomUUID();

  const hash = await sha256(uuid);

  const payload = [
    {
      id: hash.slice(0, 16),
      traceId: uuid,
      name: 'zipkin-test-' + Math.floor(Date.now() / 60000),
      timestamp: Date.now() * 1000,
      duration: 0,
      kind: 'CLIENT',
      Status: 'ERROR',
      localEndpoint: {
        serviceName: 'localEndpoint',
        port: 3306,
        IPV4: '192.168.0.1',
      },
      remoteEndpoint: {
        serviceName: 'remoteEndpoint',
        port: 6033,
      },
      tags: {
        'deployment.environment': 'dev',
        'host.name': 'zipkin-host',
        'http.method': 'GET',
        'http.path': '/api',
        'status.code': 2,
        'log.message': 'test-error',
        'log.severity': 'ERROR',
        'exception.message': 'error msg',
        'exception.type': 'Error',
        'exception.stacktrace': 'atewaet\nasdfasdf\n',
      },
    },
  ];

  debug(JSON.stringify(payload));
  let options = {
    method: 'POST',
    headers: {
      'uptrace-dsn': 'http://project2_secret_token@localhost:14317/2',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  const res = await fetch(url, options);

  info('zk', res.status, uuid);
}

function attributes(key: string, value: string) {
  return {
    key,
    value: {
      stringValue: value,
    },
  };
}

async function traces() {
  const uuid = crypto.webcrypto.randomUUID();

  const hash = await sha256(uuid);

  const scope = {
    name: 'app_or_package_name',
    version: '1.0.0',
  };

  const resource = {
    attributes: [
      attributes('rpc.system', 'test-servers-rpc'),
      attributes('rpc.service', 'http'),
      attributes('rpc.method', '1.0.0'),
      attributes('rpc.grpc.status_code', '1'),
      attributes('net.peer.name', 'test-value1'),
      attributes('test-2ss', 'test-value1'),
    ],
  };

  const span = {
    traceId: hash,
    spanId: hash.slice(0, 16),
    name: 'traces-curl-post-' + min,
    startTimeUnixNano: Date.now() * 1000000,
    endTimeUnixNano: Date.now() * 1000000,
    // "SPAN_KIND_UNSPECIFIED": 0,
    // "SPAN_KIND_INTERNAL":    1,
    // "SPAN_KIND_SERVER":      2,
    // "SPAN_KIND_CLIENT":      3,
    // "SPAN_KIND_PRODUCER":    4,
    // "SPAN_KIND_CONSUMER":    5,
    kind: 3,
    // error: 2, ok: 1
    status: {
      code: 1,
    },
    attributes: [
      attributes('test', 'test-value1'),
      attributes('test-2', 'test-value1'),
      attributes('test-23', 'test-value1'),
      attributes('test-24', 'test-value1'),
    ],
  };

  const payload = {
    resourceSpans: [
      {
        resource,
        scopeSpans: [
          {
            scope,
            spans: [span],
          },
        ],
      },
    ],
  };

  debug(JSON.stringify(payload));
  let url = 'http://uptrace:14318/v1/traces';

  const options = {
    method: 'POST',
    headers: {
      'uptrace-dsn': 'http://project2_secret_token@localhost:14318/2',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  const res = await fetch(url, options);

  info('curl', res.status, uuid);
}

tracer.startSpan('test manual span - ' + min).end();

ndjson();
traces();
zipkin();

setTimeout(() => {
  console.log('Completed.');
}, 5000);
