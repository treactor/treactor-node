import {Component} from 'react';
import './Atom.css';
import AtomVariant from 'mdi-material-ui/AtomVariant'
import LanguageJavascript from 'mdi-material-ui/LanguageJavascript'
import LanguageJava from 'mdi-material-ui/LanguageJava'
import LanguageGo from 'mdi-material-ui/LanguageGo'
import GoogleChrome from 'mdi-material-ui/GoogleChrome'

type AtomProps = {
    enabled: boolean
    element: number
    healthInterval: number
}

type AtomState = {
    data: AboutResult | null
    error: any
    healthChecking: boolean
    backoff: number
}

type AboutResult = {
    name: string,
    framework: string,
    atom: AtomResult | null
}

type AtomResult = {
    number: number,
    symbol: string,
    name: string,
}

class Atom extends Component<AtomProps, AtomState> {
    private apiUrl: string

    private timerHandler: number = 0;

    constructor(props: AtomProps) {
        super(props)
        this.state = {
            data: null,
            error: null,
            backoff: 0,
            healthChecking: false,
        };
        // @ts-ignore
        this.apiUrl = document.querySelectorAll('[name="treactor-api-url"]')[0].content
    }

    //timerHandler:TimerHandler = null

    refreshTime() {
        if (this.timerHandler !== 0) {
            clearTimeout(this.timerHandler)
        }
        if (this.props.enabled) {
            // @ts-ignore
            this.timerHandler = setTimeout(() => this.getData(), 30000 + Math.random() * 30000)
        }
    }


    handleError(res: Response): Response {
        this.refreshTime()
        if (!res.ok) {
            this.setState({
                error: res,
                healthChecking: false
            })
            throw Error()
        }
        return res
    }

    getData() {
        this.setState({
            healthChecking: true,
            error: null
        })
        fetch(this.apiUrl + "/treact/about/" + this.props.element, {
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(res => this.handleError(res))
            .then(res => res.json() as Promise<AboutResult>)
            .then((result) => {
                    this.setState({
                        data: result,
                        error: null,
                        healthChecking: false
                    })
                },
                (error) => {
                    this.refreshTime()
                    this.setState({
                        error: error,
                        healthChecking: false
                    })
                }
            )
    }

    componentDidMount() {
        this.getData()
    }

    componentWillUnmount() {
    }

    framework() {
        if (this.state.data?.framework === "java") {
            return (<LanguageJava fontSize="inherit"/>)
        } else if (this.state.data?.framework === "node") {
            return (<LanguageJavascript fontSize="inherit"/>)
        } else if (this.state.data?.framework === "golang") {
            return (<LanguageGo fontSize="inherit"/>)
        } else {
            return (<GoogleChrome fontSize="inherit"/>)
        }
    }

    atomStyle() {
        if (!this.props.enabled) {
            return "Atom Atom-disabled"
        }

        if (this.state.healthChecking) {
            return "Atom"
        }
        if (this.state.error != null) {
            return "Atom Atom-error"
        }

        if (this.state.data?.framework === "java") {
            return "Atom Atom-java"
        } else if (this.state.data?.framework === "node") {
            return "Atom Atom-node"
        } else if (this.state.data?.framework === "golang") {
            return "Atom Atom-golang"
        } else {
            return "Atom Atom"
        }
    }

    render() {
        return (<div className={this.atomStyle()}>
            <div className="element">{this.props.element}</div>
            <div className="symbol"> {this.state.data?.atom?.symbol ?? "Vd"}</div>
            <div className="name">{this.state.data?.atom?.name ?? "Voidnullium"}</div>
            <div className="icon-language">{this.framework()}</div>
            <div className="icon-atom"><AtomVariant className="colorError" fontSize="inherit"/></div>
        </div>)
    }
}

export default Atom; // Don’t forget to use export default!