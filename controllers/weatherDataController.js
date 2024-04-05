
const weatherData= require("../models/weatherData") ;
const Station = require('../models/station');

export const getYesterDayData = async (req, res) => {
    try {
        // Retrieve all branches from the database
        const stations = await Station.find({});

        // Array to store generated data for all branches
        const allstationData = [];

        // Generate data for each branch
        for (const station of stations) {
            const stationData = await generateBranchData(station);
            allstationData.push(stationData);
        }

     
    
        res.status(201).json(allstationData);
    } catch (error) {
        console.error('Error generating branch data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to generate data for a single branch
async function generateBranchData(station) {
    const yesterday = moment().subtract(1, 'days').startOf('day');
    const yesterdayStart = yesterday.toDate();
    const yesterdayEnd = yesterday.endOf('day').toDate();

    try {
        // Retrieve data for yesterday from the database
        const yesterdayData = await weatherData.find({
            timestamp: { $gte: yesterdayStart, $lte: yesterdayEnd },
            station:station
        });

        // Calculate average temperature, humidity, and air pressure
        const temperatureSum = yesterdayData.reduce((sum, data) => sum + data.temperature, 0);
        const humiditySum = yesterdayData.reduce((sum, data) => sum + data.humidity, 0);
        const airPressureSum = yesterdayData.reduce((sum, data) => sum + data.airPressure, 0);
        const totalCount = yesterdayData.length;

        const averageTemperature = temperatureSum / totalCount;
        const averageHumidity = humiditySum / totalCount;
        const averageAirPressure = airPressureSum / totalCount;

        // Send the averages as JSON response
        res.json({
            averageTemperature: averageTemperature.toFixed(2),
            averageHumidity: averageHumidity.toFixed(2),
            averageAirPressure: averageAirPressure.toFixed(2),
            timestamp: `${yesterdayStart} - ${yesterdayEnd}`
        });
        const dummyData = {
            stationId: station._id,
            averageTemperature: averageTemperature.toFixed(2),
            averageHumidity: averageHumidity.toFixed(2),
            averageAirPressure: averageAirPressure.toFixed(2),
        };
        return dummyData
    } catch (error) {
        console.error('Error retrieving yesterday\'s data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
   

   
}
