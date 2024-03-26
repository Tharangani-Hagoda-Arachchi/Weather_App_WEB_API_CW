const router = require("express").Router();
//const User= require ('./models/user')
const {getUsers,createUser}= require ('../controllers/userController')


router.post('/users', createUser);
router.get('/users', getUsers);


module.exports = router