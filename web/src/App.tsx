import {Button, Paper, TextField, TextFieldProps} from '@material-ui/core';
import React, {Component} from 'react';
import './App.css';
import Periodic from "./Periodic";
import Reaction from "./Reaction";

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
