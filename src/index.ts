import path from "path";

import {Bond, Node, TReactorRequest, TReactorResponse} from "./io/treactor/v1alpha/node";
import axios, {AxiosResponse} from "axios";
import {Config} from "./config";
import {IncomingMessage} from "http";
import Tracer from "./telemetry";
import express, {response} from "express";
// rest of the code remains same

let span = Tracer.startSpan("xx");

const app = express();
const elements = Config.getElements();

app.use(express.static(path.join(__dirname, '../web/build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../web/build', 'index.html'));
});
app.get('/ui', function (req, res) {
    res.sendFile(path.join(__dirname, '../web/build', 'index.html'));
});

app.get('/treact/about/:number', function (req, res) {

    let n = parseInt(req.params["number"])
    if (undefined === n) {
        return;
    }
    let eq = req.query["execute"] as string
    let execute = 0
    if (undefined === eq) {
        execute = 0
    } else {
        execute = parseInt(eq)
    }
    if (Config.aboutLocal(n) || execute) {
        let a = elements.byNumber(n)
        if (undefined === a) {
            return;
        }
        let request: TReactorRequest = {
            path: req.originalUrl,
            headers: extractHeaders(req)
        }
        let node: Node = {
            name: Config.SERVICE_NAME,
            version: Config.SERVICE_VERSION,
            framework: Config.FRAMEWORK,
            request: request,
            bonds: [],
            atom: {
                number: a.number,
                symbol: a.symbol,
                name: a.element
            }
        }
        res.send(node)
    } else {
        axios.get(Config.aboutUrl(n)).then(
            function (response) {
                res.send(response.data)
            }
        ).catch(
            function (result) {
                res.status(502)
                res.send(result)
            }
        )
    }
});


function extractHeaders(req: IncomingMessage): { [k: string]: any } {
    let headers: { [k: string]: any } = {};
    for (let i = 0; i < req.rawHeaders.length; i++) {
        headers[req.rawHeaders[i++]] = req.rawHeaders[i]
    }
    return headers;
}

function extractHeadersFromResponse(res: AxiosResponse): { [k: string]: any } {
    let headers: { [k: string]: any } = {};
    // for (let i = 0; i < req.rawHeaders.length; i++) {
    //     headers[req.rawHeaders[i++]] = req.rawHeaders[i]
    //     // headers.set(req.rawHeaders[i++], req.rawHeaders[i])
    // }
    return headers;
}

app.get('/treact/atom/:atom',  function (req, res) {
    let atom = elements.bySumbol(req.params["atom"])
    if (undefined === atom) {
        return;
    }
    let eq = req.query["execute"] as string
    let execute = 0
    if (undefined === eq) {
        execute = 0
    } else {
        execute = parseInt(eq)
    }
    if (Config.isComponent() || execute) {
        let request: TReactorRequest = {
            path: req.originalUrl,
            headers: extractHeaders(req)
        }
        let node: Node = {
            name: Config.SERVICE_NAME,
            version: Config.SERVICE_VERSION,
            framework: Config.FRAMEWORK,
            request: request,
            bonds: [],
            atom: {
                number: atom.number,
                symbol: atom.symbol,
                name: atom.element
            }
        }
        res.send(node)

    } else {
        axios.get(req.originalUrl + "&execute=1").then(
            function (response) {
                res.send(response.data)
            }
        ).catch(
            function (result) {
                res.status(502)
                res.send(result)
            }
        )
    }

});

app.get('/treact/bond/:b', function (req, res) {
    let request: TReactorRequest = {
        path: req.originalUrl,
        headers: extractHeaders(req)
    }
    let node: Node = {
        name: Config.SERVICE_NAME,
        version: Config.SERVICE_VERSION,
        framework: Config.FRAMEWORK,
        request: request,
        bonds: [],
        atom: undefined
    }
    res.send(node)
});

app.get('/treact/reaction', function (req, res) {
    let request: TReactorRequest = {
        path: req.originalUrl,
        headers: extractHeaders(req)
    }
    let node: Node = {
        name: Config.SERVICE_NAME,
        version: Config.SERVICE_VERSION,
        framework: Config.FRAMEWORK,
        request: request,
        bonds: [],
        atom: undefined
    }

    let molecule = req.query["molecule"] as string
    if (molecule.length < 3) {
        axios.get<any, AxiosResponse<Node>>(Config.atomUrl(molecule)).then(
            function (result) {
                let response: TReactorResponse = {
                    statusCode: result.status,
                    statusMessage: result.statusText,
                    headers: extractHeadersFromResponse(result)
                }
                let bond: Bond = {
                    response: response,
                    node: result.data
                }
                node.bonds.push(bond)
                res.send(node)
            }
        ).catch(
            function (result) {
                res.status(502)
                res.send(result)
            }
        )
    } else {
        axios.get<any, AxiosResponse<Node>>(Config.moleculeUrl(molecule)).then(
            function (result) {
                let response: TReactorResponse = {
                    statusCode: result.status,
                    statusMessage: result.statusText,
                    headers: extractHeadersFromResponse(result)
                }
                let bond: Bond = {
                    response: response,
                    node: result.data
                }
                node.bonds.push(bond)
                res.send(bond)
            }
        ).catch(
            function (result) {
                res.status(502)
                res.send(result)
            }
        )
    }
});

app.listen(Config.PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${Config.PORT}`);
});

