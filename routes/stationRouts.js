const router = require("express").Router();
const requireAuth = require ('../utils/protect')
const {getStations,createStation}= require ('../controllers/stationController')


router.post('/stations',requireAuth, createStation);
router.get('/stations',requireAuth, getStations);


module.exports = router