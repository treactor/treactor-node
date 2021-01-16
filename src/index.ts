import express from "express";
import path from "path";

import yaml from "js-yaml"
import fs from "fs"

import {Node} from "./io/treactor/v1alpha/node";
// rest of the code remains same

// import tracer from "./telemetry";


// const tracer = require('./tracer')('example-express-server');


// Get document, or throw exception on error

interface IAtom {
    number: number;
    symbol: string;
    element: string;
}

let elementsByNumber = new Map<number,IAtom>()
let elementsBySymbol = new Map<string,IAtom>()
try {
    const doc = yaml.load(fs.readFileSync('elements.yaml', 'utf8')) as object;
    // @ts-ignore
    let e = doc.elements as Array<IAtom>;
    e.forEach(atom => {
        elementsByNumber.set(atom.number, atom)
        elementsBySymbol.set(atom.symbol.toLowerCase(), atom)
    })
} catch (e) {
    console.log(e);
}


const app = express();
const PORT = 8000;

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
    let a = elementsByNumber.get(n)
    if (undefined === a) {
        return;
    }

    let node: Node = {
        name: "name",
        framework: "node",
        headers: {},
        bonds: [],
        atom: {
            number: a.number,
            symbol: a.symbol,
            name: a.element
        }
    }
    res.send(node)
});

app.get('/treact/atom/:atom', function (req, res) {
    let headers: { [k: string]: any } = {};
    for (let i = 0; i<req.rawHeaders.length; i++) {
        headers[req.rawHeaders[i++]] = req.rawHeaders[i]
        // headers.set(req.rawHeaders[i++], req.rawHeaders[i])
    }

    let node: Node = {
        name: req.baseUrl,
        framework: "",
        headers: headers,
        bonds: [],
        atom: {
            number: 4,
            symbol: "sf",
            name: ""
        }
    }
    res.send(node)
});


app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
