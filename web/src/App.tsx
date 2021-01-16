import {Button, Paper, TextField} from '@material-ui/core';
import React from 'react';
import './App.css';
import Periodic from "./Periodic";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Periodic/>
          <div></div>
      </header>

        <div>
            <TextField id="outlined-basic" label="Molecule" variant="outlined" />
            <Button variant="contained">Split</Button>
            <Paper elevation={3}>
                foobar<br/>
                foobar<br/>
                foobar<br/>
                foobar<br/>
                foobar<br/>
                foobar<br/>
                foobar<br/>
            </Paper>
        </div>
        <footer><a href="https://github.com/treactor">Treactor</a></footer>
    </div>
  );
}

export default App;
