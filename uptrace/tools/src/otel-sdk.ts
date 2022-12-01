import * as opentelemetry from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { diag, trace, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino';
import { FastifyInstrumentation } from '@opentelemetry/instrumentation-fastify';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
import { Metadata } from '@grpc/grpc-js';

// for grpc.
let metadata = new Metadata();
metadata.set('uptrace-dsn', 'http://project2_secret_token@localhost:14317/2');

const collectorOptions = {
  url: 'http://uptrace:14317/v1/traces',
  headers: { 'uptrace-dsn': 'http://project2_secret_token@localhost:14317/2' },
  metadata,
};

const exporter = new OTLPTraceExporter(collectorOptions);
const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'otel-sdk-trace',
});

const telemetry = new opentelemetry.NodeSDK({
  autoDetectResources: false,
  resource,
  traceExporter: exporter,
  // instrumentations: [getNodeAutoInstrumentations()],
  instrumentations: [new HttpInstrumentation(), new PinoInstrumentation(), new FastifyInstrumentation()],
});

telemetry.start();

process.on('SIGTERM', () => {
  telemetry
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});

const getTracer = (service: string) => {
  return trace.getTracer(service);
};

export { trace, getTracer };
