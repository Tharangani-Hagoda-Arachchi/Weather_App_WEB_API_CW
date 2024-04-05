const Districts = require('../models/district');


//retriew all districts
const getDistricts = async (req, res) => {
    try {
       
        const districts = await Districts.find();
        res.status(200).json(districts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// create new district
const createDistricts = async (req, res) => {
    try {
        const district = new Districts({
            name: req.body.name,
            users: req.body.users
        });
        const savedDistrict = await district.save();
        res.status(201).json(savedDistrict);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {createDistricts, getDistricts};
