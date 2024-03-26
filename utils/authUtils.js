const {check, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");

const validUserTypes = ["Admin", "Provincial", "Station", "Guest"];

//validate name,email, type and password
const validationRules = [

    check("name", "name must be grater than 2 characters")
    .isLength({
        min: 3
    }),

    check("email", "please provide valid emai")
    .isEmail(),

    check("password", "password must be grater than 5 characters")
    .isLength({
        min: 6
    }),

    check("password", "password must contain at least one uppercase letter")
    .not().isLowercase(),

    check("password", "password must contain at least one lowercase letter")
    .not().isUppercase(),

    check("password", "password must contain at least one non-numaric character")
    .not().isNumeric(),

    check("password", "password must contain at least one non-alphbatic character")
    .not().isAlpha(),

    check("password", "password must contain at least one special character")
    .matches(/[!@#$%^&*(),.?":{}|<>]/),

    check("type", "Invalid user type")
    .isIn(validUserTypes)
   
];

//chek validation results
const signUpValidation = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(420).json({ errors: errors.array() });
    }
    next();
}

//hashing paswoord
const hashPassword = async (password) => {
   return bcrypt.hash(password, 10);
  };
  

module.exports = {validationRules,signUpValidation,hashPassword};

