const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
    follower: {
        type: String,
        required: true
    },
    following: {
        type: String,
        required: true
    },
    followedOn: {
        type: Date,
        default: new Date()
    }
})

mongoose.model("Follower", followerSchema);