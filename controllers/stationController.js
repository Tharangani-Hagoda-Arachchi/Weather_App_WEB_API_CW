const Station = require('../models/station')

//retriew all stations
const getStations = async (req, res) => {
    try {
       
        const stationList = await Station.find().populate('district');
        res.status(200).json(stationList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// create new station
const createStation = async (req, res) => {
    try {
        const station = new Station({
            name: req.body.name,
            province: req.body.district,
            latitude:req.body.latitude,
            longitude:req.body.longitude
        });
        const savedStation = await station.save();
        res.status(201).json(savedStation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {createStation, getStations};