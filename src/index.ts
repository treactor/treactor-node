import express from "express";
import path from "path";
// rest of the code remains same

// import tracer from "./telemetry";


// const tracer = require('./tracer')('example-express-server');


const app = express();


const PORT = 8000;

app.use(express.static(path.join(__dirname, '../web/build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../web/build', 'index.html'));
});
app.get('/ui', function (req, res) {
    res.sendFile(path.join(__dirname, '../web/build', 'index.html'));
});



// app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
