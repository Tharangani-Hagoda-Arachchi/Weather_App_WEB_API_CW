const User = require('../models/user')
const {hashPassword} = require('../utils/authUtils');


const signUp = async (req, res) => {

    // Extract user details from the request body
    const { name, email, password, type } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);
        console.log(hashedPassword);

        // Create a new user
        const user = new User({
            name:name,
            email:email,
            password:hashedPassword,
            type:type
        });

        // Save the new user to the database
        await user.save();

        console.log("user sucessfully created");

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    
};

module.exports = {signUp};

