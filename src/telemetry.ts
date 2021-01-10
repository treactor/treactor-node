import opentelemetry from "@opentelemetry/api"
import NodeTracerProvider from "@opentelemetry/node"
import SimpleSpanProcessor from "@opentelemetry/tracing"
const { OtlpExporter } = require('@opentelemetry/exporter-otlp');

const EXPORTER = process.env.EXPORTER || '';

module.exports = (serviceName:string) => {
    // @ts-ignore
    const provider = new NodeTracerProvider({
        plugins: {
            express: {
                enabled: true,
                path: '@opentelemetry/plugin-express',
            },
            http: {
                enabled: true,
                path: '@opentelemetry/plugin-http',
            },
        },
    });

    let exporter = new OtlpExporter({
            serviceName,
        });

    // @ts-ignore
    provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

    // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
    provider.register();

    return opentelemetry.trace.getTracer('express-example');
};