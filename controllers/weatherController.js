const Weather = require("../models/Weather");

const fetchWeatherData = async (req, res) => {
  try {
    const data = await Weather.find();
    console.log("Fetching weather Data...");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Route to handle POST request for inserting data
const postWeatherData = async (req, res) => {
  try {
    // Create a new feature object based on the request body
    const newWeather = new Weather({
      type: req.body.type || "WeatherStation",
      properties: {
        station: req.body.properties.station,
        description: req.body.properties.description,
        temperature: req.body.properties.temperature,
        humidity: req.body.properties.humidity,
        airPressure: req.body.properties.airPressure,
      },
      geometry: {
        type: req.body.geometry.type,
        coordinates: req.body.geometry.coordinates,
      },
    });

    // Save the new feature to the database
    const savedWeather = await newWeather.save();

    res.status(201).json(savedWeather); // Return the saved feature
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

async function watchWeatherData(io) {
  const changeStream = WeatherData.watch();

  changeStream.on("change", async (change) => {
    if (change.operationType === "insert") {
      const newData = await Weather.find();
      io.emit("updateData", newData);
    }
  });

  // Handle errors
  changeStream.on("error", (error) => {
    console.error("Change stream error:", error);
  });
}

module.exports = { postWeatherData, fetchWeatherData, watchWeatherData };
