const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    postReference: {
        type: ObjectId,
        ref: "InstaPost"
    },
    commentOwner: {
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

mongoose.model("Comment", commentSchema);