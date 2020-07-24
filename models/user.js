const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    }
})

mongoose.model("User", userSchema);