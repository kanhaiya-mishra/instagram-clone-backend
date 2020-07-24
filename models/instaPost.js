const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const instaPostSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        default: ""
    },
    commentId: {
        type: ObjectId,
        ref: "Comment"
    },
    postOwner: {
        type: ObjectId,
        ref: "User"
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