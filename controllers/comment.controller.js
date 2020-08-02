const mongoose = require("mongoose")
const Comment = mongoose.model("Comment");
const Post = mongoose.model("InstaPost");

class CommentController {

    static getComments(req, res) {
        const { id } = req.params;
        if (!id) return res.status(422).json({ error: "Required Parameter(s) Missing" });
        Comment.find({ parentId: id })
            .then((comments) => {
                if (!comments) return res.status(422).json({ error: "Something went wrong, Please try again later." });
                res.json(comments);
            })
            .catch((err) => { console.log(err) });
    }

    static addComment(req, res) {
        const { postId, commentText, profilePicURL } = req.body;
        if (!postId || !commentText) return res.status(422).json({ error: "Required Parameter(s) Missing" });
        const comment = new Comment({
            parentId: postId,
            commentText,
            commentOwnerId: req.user.id,
            commentOwnerIdUsername: req.user.username,
            commentOwnerProfilePicURL: profilePicURL
        });
        let finalComment = {};
        comment.save()
            .then((result) => {
                if (!result) return res.status(422).json({ error: "Something went wrong, Please try again later." });
                finalComment = result;
                return Post.findOne({ _id: postId })
            })
            .then((post) => {
                if (!post) return res.status(422).json({ error: "Something went wrong, Please try again later." });
                post['commentCount']++;
                return post.save();
            })
            .then((done) => {
                if (!done) return res.status(422).json({ error: "Something went wrong, Please try again later." });
                res.json(finalComment);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static updateComment(req, res) {
        const { title, caption } = req.body;
        if (!title || !caption) return res.status(422).json({ error: "Required Parameter(s) Missing" });
        const Post = new InstaPost({
            title,
            caption,
            postOwner: req.user
        });
        Post.save()
            .then((result) => {
                if (!result) return res.status(422).json({ error: "Something went wrong, Please try again later." });
                res.json({ post: result });
            })
            .catch((err) => { console.log(err) });
    }

    static deleteComment(req, res) {
        const { id } = req.params;
        if (!id) return res.status(422).json({ error: "Required Parameter(s) Missing" });
        Comment.findOneAndDelete({ _id: id })
            .then((comment) => {
                if (!comment) return res.status(422).json({ error: "Something went wrong, Please try again later." });
                return Post.findOne({ _id: comment.parentId })
            })
            .then((post) => {
                if (!post) return res.status(422).json({ error: "Something went wrong, Please try again later." });
                post['commentCount']--;
                return post.save();
            })
            .then((done) => {
                if (!done) return res.status(422).json({ error: "Something went wrong, Please try again later." });
                res.json(true);
            })
            .catch((err) => { console.log(err) });
    }

}

module.exports = CommentController;