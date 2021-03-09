import {Elements} from "./elements";

enum Mode {
    Local = "local",
    Cluster = "cluster"
}

enum Component {
    Component = "component",
    Gateway = "gateway"
}

class Configuration {
    get mode(): Mode {
        return this._mode;
    }

    private elements = new Elements()

    public PORT = process.env.PORT || 3330
    public SERVICE_NAME = process.env.SERVICE_NAME || "treactor-app"
    public SERVICE_VERSION = process.env.SERVICE_VERSION || "0.0"
    public OTEL_EXPORTER_OTLP_ENDPOINT = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || "localhost:4317"
    public FRAMEWORK = "node"

    public MODULE = process.env.TREACTOR_MODULE || "treactor"
    public COMPONENT = process.env.TREACTOR_COMPONENT || "app"
    public MAX_BOND = parseInt(process.env.TREACTOR_MAX_BOND || "5")
    public MAX_NUMBER = parseInt(process.env.TREACTOR_MAX_NUMBER || "118")

    private readonly _mode

    constructor() {
        if ("cluster" == process.env.TREACTOR_MODE) {
            this._mode = Mode.Cluster
        } else {
            this._mode = Mode.Local
        }

    }

    getElements() {
        return this.elements
    }

    aboutLocal(n: number) {
        return false;
    }

    isComponent() {
        return false;
    }

    nodeUrl(n: number) {
        return `${this.nodeHost(n)}/treact/nodes/${n}/info?execute=1`;
    }

    atomUrl(molecule: string) {
        return `${this.atomHostFromSymbol(molecule)}/treact/atoms/${molecule.toLowerCase()}?symbol=${molecule}&execute=1`
    }

    moleculeUrl(molecule: string) {
        if (this._mode == Mode.Cluster) {
            if (this.MODULE == "bond") {
                if (this.COMPONENT == "n") {
                    return `http://bond-n/treact/bonds/n?molecule=${molecule}&execute=1`
                }
                let next = parseInt(this.COMPONENT) + 1
                if(next > this.MAX_BOND) {
                    return `http://bond-n/treact/bonds/n?molecule=${molecule}&execute=1`
                }
                return `http://bond-${next}/treact/bonds/${next}?molecule=${molecule}&execute=1`
            }
            return `http://bond-1/treact/bonds/1?molecule=${molecule}&execute=1`
        } else {
            return `http://localhost:${this.PORT}/treact/bonds/n?molecule=${molecule}&execute=1`
        }
    }

    private nodeHost(n: number) {
        if (this._mode == Mode.Cluster) {
            if(n == 500) {
                return "http://treactor-ui"
            }
            if(n == 501) {
                return "http://treactor-api"
            }
            if(n >= 201 && n < 201 + this.MAX_BOND) {
                return `http://bond-${n-200}`
            }
            if(n === 201 + this.MAX_BOND) {
                return "http://bond-n"
            }
            let node = this.elements.byNumber(n);
            if (node === undefined) {
                throw Error("Unknown Atom")
            }
            return `http://atom-${node.symbol.toLowerCase()}`
        } else {
            return `http://localhost:${this.PORT}`
        }
    }

    private atomHostFromSymbol(s: string) {
        if (this._mode == Mode.Cluster) {
            let atom = this.elements.bySumbol(s);
            // @ts-ignore
            return `http://atom-${atom.symbol.toLowerCase()}`
        } else {
            return `http://localhost:${this.PORT}`
        }
    }
}

export const Config = new Configuration();