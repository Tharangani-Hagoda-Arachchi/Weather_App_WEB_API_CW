const Weather = require("../models/Weather");

async function weatherGenerator() {
  const stations = await Weather.find();

  setInterval(async () => {
    console.log("Number of stations available:", stations.length);
    const allStationData = {};
    for (const station of stations) {
      const stationData = generateWeatherData(station.properties.station);

      await saveWeatherData(
        station.properties.station,
        stationData,
        station.geometry.coordinates
      );
      if (!allStationData[station.properties.station]) {
        allStationData[station.properties.station] = [];
      }
      allStationData[station.properties.station].push(stationData);
    }
  },1000); //1000*60*5
}

async function saveWeatherData(station, data, coordinates) {
  try {
    await Weather.findOneAndUpdate(
      { "properties.station": station },
      {
        $set: {
          "properties.temperature": data.temperature,
          "properties.humidity": data.humidity,
          "properties.airPressure": data.airPressure,
          "geometry.coordinates": coordinates,
        },
      },
      { upsert: true }
    );
    console.log("Weather data saved/updated for station:", data.temperature);
  } catch (error) {
    console.error("Error saving/updating weather data:", error);
  }
}

function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to generate station data
function generateWeatherData(stationId) {
  const temperature = getRandomInRange(-20, 40); // Temperature range: -20°C to 40°C
  const humidity = getRandomInRange(0, 100); // Humidity range: 0% to 100%
  const airPressure = getRandomInRange(900, 1100); // Air pressure range: 900 hPa to 1100 hPa

  return {
    temperature,
    humidity,
    airPressure,
  };
}

module.exports = weatherGenerator;
