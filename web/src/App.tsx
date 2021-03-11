import {Button, Paper, TextField, TextFieldProps} from '@material-ui/core';
import React, {Component} from 'react';
import './App.css';
import Periodic from "./Periodic";
import Reaction from "./Reaction";
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/tracing';
import { WebTracerProvider } from '@opentelemetry/web';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { CollectorTraceExporter } from '@opentelemetry/exporter-collector';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { HttpTraceContext } from '@opentelemetry/core';
import { UserInteractionInstrumentation } from "@opentelemetry/instrumentation-user-interaction";
import { Resource } from "@opentelemetry/resources";
import { tracer } from "./modules/telemetry/telemetry";

// /* eslint-disable */
// let resource = new Resource({
//     "service.name": "treactor-web",
//     "service.version": "dev",
//     "telemetry.sdk.name": "opentelemetry",
//     "telemetry.sdk.language": "webjs",
//     "telemetry.sdk.version": "0.14.0"
// });
//
// export const traceProvider = new WebTracerProvider({
//     resource: resource,
// });
//
// traceProvider.addSpanProcessor(
//     new SimpleSpanProcessor(new CollectorTraceExporter({
//         url: "/v1/trace"
//     }))
// );
//
// const fetchInstrumentation = new FetchInstrumentation();
// const documentLoadInstrumentation = new DocumentLoadInstrumentation();
// const userInteractionIInstrumentation = new UserInteractionInstrumentation();
// traceProvider.register({
//     contextManager: new ZoneContextManager(),
//     propagator: new HttpTraceContext()
// });
// fetchInstrumentation.setTracerProvider(traceProvider);
// documentLoadInstrumentation.setTracerProvider(traceProvider);
// userInteractionIInstrumentation.setTracerProvider(traceProvider);
//
// export const tracer = traceProvider.getTracer("io.treactor.tracing.web", "0.5");


type AppProps = {
}

type AppState = {
}

class App extends Component<AppProps, AppState> {
    private readonly maxNumber:number
    private readonly maxBound:number

    constructor(props: AppProps) {
        super(props);
        // @ts-ignore
         this.maxNumber = document.querySelectorAll('[name="treactor-max-number"]')[0].content
        // @ts-ignore
         this.maxBound = document.querySelectorAll('[name="treactor-max-number"]')[0].content
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Periodic/>
                    <div></div>
                    <Reaction/>
                </header>

                <footer><a href="https://github.com/treactor">TReactor</a></footer>
            </div>
        );
    }
}

export default App;
