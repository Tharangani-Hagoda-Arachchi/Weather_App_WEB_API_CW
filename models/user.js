const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [100, "Name cannot exceed 100 characters"],
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        maxlength: [100, "Email cannot exceed 100 characters"],
        required: [true, "Email is required"],
        validate: {
            validator: (value) => {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    value
                );
            },
            message: (props) => `Invalid email format!`,
        },
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 8 characters long"]
    },
    type: {
        type: String,
        enum: {
            values: [
                "Admin",
                "Provincial",
                "Station",
                "Guest"
            ],
            message: "Invalid user type!"
        },
        required: [true, "User type is required!"]
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;