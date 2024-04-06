const router = require("express").Router();
const requireAuth = require('../utils/protect')

const {
  postWeatherData,
  fetchWeatherData,
} = require("../controllers/weatherController");

// Route to fetch weather data
router.post("/weathers", postWeatherData);
router.get("/weathers", fetchWeatherData);

module.exports = router;
