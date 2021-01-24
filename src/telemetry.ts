import opentelemetry from "@opentelemetry/api"
import {NodeTracerProvider} from "@opentelemetry/node"
import {SimpleSpanProcessor} from "@opentelemetry/tracing"
import {Config} from "./config";
import {CollectorTraceExporter} from '@opentelemetry/exporter-collector-grpc';

const provider = new NodeTracerProvider(
    {
        plugins: {
            // express: {
            //     enabled: true,
            //     path: '@opentelemetry/plugin-express',
            // },
            http: {
                enabled: true,
                path: '@opentelemetry/plugin-http',
            },
        }
    }
);

const collectorOptions = {
    serviceName: Config.SERVICE_NAME,
    serviceVersion: Config.SERVICE_VERSION,
    url: Config.OTEL_EXPORTER_OTLP_ENDPOINT
};
const exporter = new CollectorTraceExporter(collectorOptions);

provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
// Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
provider.register();

export default opentelemetry.trace.getTracer('treactor-node');
