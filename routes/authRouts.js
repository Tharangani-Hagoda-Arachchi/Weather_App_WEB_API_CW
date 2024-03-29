const router = require("express").Router();
const {signUp,signIn}= require ('../controllers/authController');
const {signUpValidation,validationRules}= require ('../utils/authUtils');


// Route for user sign-up

router.post('/signup',validationRules,signUpValidation,signUp);

// Route for user sign-up
router.post('/signin',signIn);



module.exports = router;