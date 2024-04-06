const mongoose = require("mongoose");

// Define the schema
const weatherSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    default: "WeatherStation",
  },
  properties: {
    station: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: [true, "Temperature is required"],
    },
    humidity: {
      type: Number,
      required: [true, "Humidity is required"],
    },
    airPressure: {
      type: Number,
      required: [true, "Air Preassure is required"],
    },
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

// Define the model
const Weather = mongoose.model("Weather", weatherSchema);

module.exports = Weather;
