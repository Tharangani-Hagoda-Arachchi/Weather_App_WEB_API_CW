const { Server } = require('socket.io');
const Station = require('../models/station');
const http = require('http');
const weatherData= require("../models/weatherData") ;
const cors = require('cors'); 


const corsOptions = {
  origin: 'http://localhost:5000', 
  credentials: true,// Allow requests from your React app
};

//const JWT_SECRET = process.env.JWT_SECRET;
 async function weatherDataSocket(app) {
    app.use(cors(corsOptions));
 
    const server = http.createServer(app);
    const io = new Server(server, {
      cors: corsOptions, // Enable CORS for Socket.io
    });

   const stations = await Station.find().populate('district');;

    setInterval(async () => {
        const allStationData = {};
        for (const station of stations) {
            const stationData = generateStationData(station.id);

            await saveWeatherData(stationData); // Save weather data to the database
            if (!allStationData[station.id]) {
                allStationData[station.id] = [];
            }
            allStationData[station.id].push({...stationData,latitude: station.latitude,
                longitude: station.longitude,});
        }
        io.emit('allStationData', allStationData);
    }, 1000*60*5);

    
    io.on('connection', (socket) => {
        console.log('A client connected');

        socket.on('disconnect', () => {
            console.log('A client disconnected');
        });
    });

    server.listen(4000, () => {
        console.log('Socket.io server is running on port 4000');
    });
}

async function saveWeatherData(data) {
    try {
        const newWeatherData = new weatherData(data); // Rename variable to avoid conflict
        await newWeatherData.save();
        console.log('Weather data saved to the database:', data);
    } catch (error) {
        console.error('Error saving weather data:', error);
    }
}

function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to generate station data
function generateStationData(stationId) {
    const temperature = getRandomInRange(-20, 40); // Temperature range: -20°C to 40°C
    const humidity = getRandomInRange(0, 100); // Humidity range: 0% to 100%
    const airPressure = getRandomInRange(900, 1100); // Air pressure range: 900 hPa to 1100 hPa

    return {
        stationId,
        temperature,
        humidity,
        airPressure
    };
}

module.exports= weatherDataSocket