const PORT = process.env.PORT || 3001;
require("dotenv").config();

//import mongoose to initialze
require("./configurations/dbconfig");
const bodyParser = require("body-parser");
const socketHandler = require("./sockets/weather");
const weatherGenerator = require("./utils/weatherGenerator");

const userRouts = require("./routes/userRouts");
const authRouts = require("./routes/authRouts");
const weatherRouter = require("./routes/weatherRouter");

// Initialize Express app
const express = require("express");
const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use("/auths", authRouts);
app.use("/api", userRouts);
app.use("/api", weatherRouter);

// Set up Express server
const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);

// Open WebSocket connections
socketHandler(server);
// Weather Updater
weatherGenerator();
