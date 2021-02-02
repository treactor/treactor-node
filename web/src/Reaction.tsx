import React, {Component} from 'react';
import {Button, MenuItem, Select, TextField, Grid} from "@material-ui/core";
import JSONPretty from 'react-json-pretty';
import './Reaction.css';


type ReactorProps = {}

type ReactorState = {
    molecule: string
    data: any
}

let style = {
    main: 'line-height:1.3;color:#f8f8f2;background:#1e1e1e;overflow:auto;',
    error: 'line-height:1.3;color:#f8f8f2;background:#1e1e1e;overflow:auto;',
    key: 'color:#ff5e5e;',
    string: 'color:#e9fdac;',
    value: 'color:#fdb082;',
    boolean: 'color:#69c;',
};

class Reaction extends Component<ReactorProps, ReactorState> {

    constructor(props: any) {
        super(props);
        this.state = {molecule: '', data: {"foo": "bar"}};

        // this.handleChange = this.handleChange.bind(this);
        // this.moleculeChange = this.moleculeChange.bind(this);
    }

    private moleculeChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        this.setState({molecule: event.target.value})
    }

    private startReaction = () => {
        fetch("/treact/reactions?molecule=" + this.state.molecule)
            .then(response => response.json())
            .then((data) => {
                    this.setState({
                        data: data
                    })
                },
                (error) => {
                    console.log(error)
                    // this.setState({
                    //     data: this.state.error,
                    //     error: error
                    // })
                }
            )
    }

    // private startReaction() {
    // }

    // onChange={() => this.moleculeChange}

    render() {
        return (
            <div className="reactor">

                <Grid container
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-end"
                      spacing={1}
                      id="reactor-control">
                    <TextField id="molecule" label="Molecule" margin="normal"
                               onChange={(event => this.moleculeChange(event))}
                               value={this.state.molecule}/>
                    <Select id="mode" value="1" variant="standard">
                        <MenuItem value="1">Gateway</MenuItem>
                        <MenuItem value="2">Direct</MenuItem>
                    </Select>
                    <Button id="reaction" variant="contained"
                            onClick={this.startReaction}>Reaction</Button>
                </Grid>
                <div>
                    <JSONPretty id="result" data={this.state.data} theme={style}></JSONPretty>
                </div>
            </div>
        )
    }

}

export default Reaction;