 //load variables from env
 require('dotenv').config();
 const bodyParser = require('body-parser');
 const {url} = require('url')
 const path = require('path')
 const weatherDataSocket = require ('./sockets/weatherDataSocket')
 //import mongoose instant
const mongoose= require ('./configurations/dbconfig')

const userRouts= require ('./routes/userRouts')
const authRouts  = require ('./routes/authRouts')
const stationRouts  = require ('./routes/stationRouts')

const express = require('express')
const app = express()

const http = require('http')
const{Server} = require('http')
const server = http.createServer(app)
app.use(bodyParser.json());



app.use(express.json());
const __filename3 = __filename;
const myDirname = path.dirname(__filename3);

const io = new Server(server);

weatherDataSocket(app)
app.get('/socket.io/socket.io.js/', (req, res) => {
    console.log("dsss");
    console.log(__dirname);
  res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});

app.use('/auths', authRouts);
app.use('/api', userRouts);
app.use('/api', stationRouts);

app.listen(3000, () => console.log('server started'))








