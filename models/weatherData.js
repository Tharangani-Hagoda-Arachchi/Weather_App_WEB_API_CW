const mongoose = require('mongoose');


const weatherDataSchema = new mongoose.Schema({
    stationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'station' 
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
    }
},{
    versionKey: false,
    timestamps: true,
  });

const weatherData = mongoose.model('weatherData', weatherDataSchema);

module.exports= weatherData;