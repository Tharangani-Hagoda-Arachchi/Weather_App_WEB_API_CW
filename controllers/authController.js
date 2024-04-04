const User = require('../models/user')
const  cookies = require("cookies")
const cookie = require("cookie-parser")
const {hashPassword,createToken,maxAge,verifyPassword} = require('../utils/authUtils');



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

         // provide Token
        const token = createToken(user._id,user.type,user.name);

        // send cookies
        res.cookie('SignIntoken', token, {
            
            maxAge: maxAge * 1000, 
        });
 

        res.status(201).json({
            message: 'User created successfully and set cookies',
            userId: user._id,
            email: user.email,
            name: user.name,
            type: user.type,
            token: token,
           
        });
    
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    
};




const signIn = async (req, res) => {

    // Extract user details from the request body
    const { email, password} = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            const verifiedPassword = await verifyPassword(password,userExists.password)
            console.log("verify");


            if(verifiedPassword){
                // provide Token
                const token = createToken(userExists._id,userExists.type,userExists.name);

                //set cookie
                res.cookie('SignIntoken', token, {

                    maxAge: maxAge * 1000, 
                });
       

                res.status(201).json({
                    message: 'User login successfully and set cookie',
                    userId: userExists._id,
                    email: userExists.email,
                    name: userExists.name,
                    type: userExists.type,
                    token: token   
                });
    

            } else{
                res.status(400).json({ message: "Incorrect password" }); 
            }

        }else{
            res.status(400).json({ message: "No user Found" }); 
        }
   
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
   
};


module.exports = {signUp,signIn};

