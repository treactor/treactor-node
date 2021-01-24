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
    public SERVICE_NAME = process.env.SERVICE_NAME || "treactor"
    public SERVICE_VERSION = process.env.SERVICE_VERSION || "0.0"
    public OTEL_EXPORTER_OTLP_ENDPOINT = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || "localhost:4317"
    public FRAMEWORK = "node"

    private readonly _mode

    constructor() {
        if("cluster" == process.env.TREACTOR_MODE) {
            this._mode = Mode.Cluster
        }
        else {
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

    aboutUrl(n: number) {
        return `${this.aboutHost(n)}/treact/about/${n}?execute=1`;
    }

    atomUrl(molecule: string) {
        return `${this.atomHostFromSymbol(molecule)}/treact/atom/${molecule.toLowerCase()}?symbol=${molecule}&execute=1`
    }

    moleculeUrl(molecule: string) {
        return `${this.bondHost()}/treact/bond/1?molecule=${molecule}&execute=1`
    }

    private aboutHost(n: number) {
        if (this._mode == Mode.Cluster) {
            let atom = this.elements.byNumber(n);
            // @ts-ignore
            return `http://atom-${atom.symbol.toLowerCase()}`
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

    private bondHost() {
        if (this._mode == Mode.Cluster) {
            // @ts-ignore
            return `http://bond-n`
        } else {
            return `http://localhost:${this.PORT}`
        }
    }

}

export const Config = new Configuration();