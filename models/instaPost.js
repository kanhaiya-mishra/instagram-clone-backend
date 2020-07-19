const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const instaPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "No Photo"
    },
    postOwner: {
        type: ObjectId,
        ref: "User"
    },
    createdOn: {
        type: Date,
        default: new Date()
    }
})

mongoose.model("InstaPost", instaPostSchema);