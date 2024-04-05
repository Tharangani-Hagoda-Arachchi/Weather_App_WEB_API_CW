const mongoose = require('mongoose');


const stationSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [100, "Name cannot exceed 100 characters"],
        required: [true, "Name is required"],
        
      },
   
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'districts'

    },
    latitude: {
      type: Number,
      required: [true, "Latitude is required!"],
      min: [-90, "Latitude must be between -90 and 90"],
      max: [90, "Latitude must be between -90 and 90"]
  },
  longitude: {
      type: Number,
      required: [true, "Longitude is required!"],
      min: [-180, "Longitude must be between -180 and 180"],
      max: [180, "Longitude must be between -180 and 180"]
  }
},{
    versionKey: false,
    timestamps: true,
  });

const Station = mongoose.model('stations', stationSchema);

module.exports = Station;
