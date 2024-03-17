//load variables from env
require('dotenv').config();

//import mongoose
const mongoose = require('mongoose');

//define mongodb url
const MONGODB_URL= `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@weather-app-db.q1ticym.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.DATABASE_NAME}`;
      
//connect mongodb
mongoose.connect(MONGODB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error('Error connecting to MongoDB:', err.message));

    

module.exports = mongoose;
  