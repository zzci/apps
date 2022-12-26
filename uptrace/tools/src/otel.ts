import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { Resource } from '@opentelemetry/resources';
import { diag, trace, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino';
import { FastifyInstrumentation } from '@opentelemetry/instrumentation-fastify';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'otel-trace',
});

const provider = new NodeTracerProvider({ resource });

provider.register();

const collectorOptions = {
  url: 'http://uptrace:14318/v1/traces',
  headers: { 'uptrace-dsn': 'http://project2_secret_token@localhost:14317/2' },
};

const exporter = new OTLPTraceExporter(collectorOptions);

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

registerInstrumentations({
  instrumentations: [new HttpInstrumentation(), new PinoInstrumentation(), new FastifyInstrumentation()],
  tracerProvider: provider,
});

const getTracer = (service: string) => {
  return trace.getTracer(service);
};

export { getTracer, trace };
