const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    parentId: {
        type: String,
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    commentOwnerId: {
        type: String,
        required: true
    },
    commentOwnerIdUsername: {
        type: String,
        required: true
    },
    commentOwnerProfilePicURL: {
        type: String,
        default: ""
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