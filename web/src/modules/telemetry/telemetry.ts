/* eslint-disable */
import {Resource} from "@opentelemetry/resources";
import {WebTracerProvider} from "@opentelemetry/web";
import {SimpleSpanProcessor} from "@opentelemetry/tracing";
import {CollectorTraceExporter} from "@opentelemetry/exporter-collector";
import {FetchInstrumentation} from "@opentelemetry/instrumentation-fetch";
import {DocumentLoadInstrumentation} from "@opentelemetry/instrumentation-document-load";
import {UserInteractionInstrumentation} from "@opentelemetry/instrumentation-user-interaction";
import {ZoneContextManager} from "@opentelemetry/context-zone";
import {HttpTraceContext} from "@opentelemetry/core";

let resource = new Resource({
    "service.name": "treactor-web",
    "service.version": "dev",
    "telemetry.sdk.name": "opentelemetry",
    "telemetry.sdk.language": "webjs",
    "telemetry.sdk.version": "0.14.0"
});

export const traceProvider = new WebTracerProvider({
    resource: resource,
});

traceProvider.addSpanProcessor(
    new SimpleSpanProcessor(new CollectorTraceExporter({
        url: "/v1/trace"
    }))
);

const fetchInstrumentation = new FetchInstrumentation();
const documentLoadInstrumentation = new DocumentLoadInstrumentation();
const userInteractionIInstrumentation = new UserInteractionInstrumentation();
traceProvider.register({
    contextManager: new ZoneContextManager(),
    propagator: new HttpTraceContext()
});
fetchInstrumentation.setTracerProvider(traceProvider);
documentLoadInstrumentation.setTracerProvider(traceProvider);
userInteractionIInstrumentation.setTracerProvider(traceProvider);

export const tracer = traceProvider.getTracer("io.treactor.tracing.web", "0.5");
