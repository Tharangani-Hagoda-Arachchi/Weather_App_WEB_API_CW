const PORT = process.env.PORT || 3001;
require("dotenv").config();
const cors = require ('cors');

//import mongoose to initialze
require("./configurations/dbconfig");
const bodyParser = require("body-parser");
const socketHandler = require("./sockets/weather");
const weatherGenerator = require("./utils/weatherGenerator");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const userRouts = require("./routes/userRouts");
const authRouts = require("./routes/authRouts");
const weatherRouter = require("./routes/weatherRouter");


const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from your React app
};


// Initialize Express app
const express = require("express");
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Weather API',
      description: 'Weather API Documentation using Swagger',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Local development server',
      },
    ],
  },
  apis: ['app.js'], // Path to the API routes files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/auths", authRouts);
app.use("/api", userRouts);
// Your API routes
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieves a list of users
 *     description: Returns a list of all users.
 *     responses:
 *       '200':
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user's ID.
 *                   name:
 *                     type: string
 *                     description: The user's name.
 *                   email:
 *                     type: string
 *                     description: The user's email address.
 */


app.get('/api/users', (req, res) => {
  res.json({ message: 'Get users endpoint' });
});
app.use("/api", weatherRouter);

// Set up Express server
const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);

// Open WebSocket connections
socketHandler(server);
// Weather Updater
weatherGenerator();
