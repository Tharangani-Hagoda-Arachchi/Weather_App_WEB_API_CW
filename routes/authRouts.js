const router = require("express").Router();
const {signUp}= require ('../controllers/authController');
const {signUpValidation,validationRules}= require ('../utils/authUtils');


// Route for user sign-up

router.post('/signup',validationRules,signUpValidation,signUp);



module.exports = router;