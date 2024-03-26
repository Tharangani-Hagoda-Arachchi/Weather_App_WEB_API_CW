 //load variables from env
 require('dotenv').config();
 
 const bodyParser = require('body-parser');

 //import mongoose instant
const mongoose= require ('./configurations/dbconfig')

const userRouts= require ('./routes/userRouts')

const authRouts  = require ('./routes/authRouts')


const express = require('express')
const app = express()
app.use(bodyParser.json());

const http = require('http').Server(app)

app.use(express.json())

app.use('/auths', authRouts);
app.use('/api', userRouts);


app.listen(3000, () => console.log('server started'))








