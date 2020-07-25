const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const instaPostSchema = new mongoose.Schema({
    imageURL: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        default: ""
    },
    commentId: {
        type: ObjectId,
        ref: "Comment"
    },
    postOwnerUsername: {
        type: String,
        required: true
    },
    postOwner: {
        type: Object,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    likeCount: {
        type: Number,
        default: 0
    }
})

mongoose.model("InstaPost", instaPostSchema);