const express = require('express');
const bodyParser = require('body-parser');
const mongoUtil = require('./server/utils/mongoUtil');
const path = require('path');
const http = require('http');
const api = require('./server/routes/api');

const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api', api);


app.use(express.static(path.join(__dirname,'./dist')));

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname,'dist/index.html'));
});

const port = process.env.port || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running on locahost:${port}'));


