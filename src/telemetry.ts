import opentelemetry from "@opentelemetry/api"
import {NodeTracerProvider} from "@opentelemetry/node"
import {SimpleSpanProcessor} from "@opentelemetry/tracing"
import {Config} from "./config";
import {CollectorTraceExporter} from '@opentelemetry/exporter-collector-grpc';
const {HttpInstrumentation} = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');

const traceProvider = new NodeTracerProvider({});

const collectorOptions = {
    serviceName: Config.SERVICE_NAME,
    serviceVersion: Config.SERVICE_VERSION,
    url: Config.OTEL_EXPORTER_OTLP_ENDPOINT
};
const exporter = new CollectorTraceExporter(collectorOptions);

traceProvider.addSpanProcessor(new SimpleSpanProcessor(exporter));

const expressInstrumentation = new ExpressInstrumentation();
const httpInstrumentation = new HttpInstrumentation({});
traceProvider.register();
httpInstrumentation.enable();
httpInstrumentation.setTracerProvider(traceProvider);
expressInstrumentation.setTracerProvider(traceProvider);

export default opentelemetry.trace.getTracer('treactor-node');
