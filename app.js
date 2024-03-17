 //load variables from env
 require('dotenv').config();

 //import mongoose instant
const mongoose= require ('./configurations/dbconfig')


const express = require('express')
const app = express()

const http = require('http').Server(app)

app.use(express.json())

app.listen(3000, () => console.log('server started'))








