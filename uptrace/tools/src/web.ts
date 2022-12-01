import { trace, getTracer } from './otel';
// import { trace, getTracer } from './otel-sdk';
const tracer = getTracer('my-service-tracer');

import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

fastify.get('/', function (request, reply) {

  tracer.startSpan('test manual span - ' + Math.floor(Date.now() / 60000));

  reply.send({ msg: 'hello world' });
});

fastify.listen({ port: 3008 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
