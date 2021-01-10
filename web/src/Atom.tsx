import {Component} from 'react';

type AtomProps = {
    element: number
}

class Atom extends Component<AtomProps> {
    constructor(props: AtomProps) {
        super(props)
    }

    render() {
        return (<span>{this.props.element}</span>)
    }
}

export default Atom; // Don’t forget to use export default!