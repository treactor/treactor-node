import {Component} from 'react';
import './Atom.css';

type AtomProps = {
    element: number
}

type AtomData = {
    data: AboutResult | null
    error: any
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

class Atom extends Component<AtomProps, AtomData> {
    constructor(props: AtomProps) {
        super(props)
        this.state = {
            data: null,
            error: null
        };
    }

    getData() {
        fetch("/treact/about/" + this.props.element)
            .then(res => res.json() as Promise<AboutResult>)
            .then((result) => {
                    this.setState({
                        data: result,
                        error: null
                    })
                },
                (error) => {
                    this.setState({
                        data: this.state.error,
                        error: error
                    })
                }
            )
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (<div className="Atom">
            <div className="element">{this.props.element}</div>
            <div className="symbol"> {this.state.data?.atom?.symbol}</div>
            <div className="name">{this.state.data?.atom?.name}</div>
           </div>)
    }
}

export default Atom; // Don’t forget to use export default!