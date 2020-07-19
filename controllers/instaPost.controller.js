const mongoose = require("mongoose")
const InstaPost = mongoose.model("InstaPost");

class InstaPostController {

    static createPost(req, res) {
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

    static getPosts(req, res) {
        const { myPosts } = req.params;
        if (myPosts) {
            InstaPost.find({ postOwner: req.user.id })
                .then((posts) => {
                    if (!posts) return res.status(422).json({ error: "Something went wrong, Please try again later." });
                    res.json({ posts });
                })
                .catch((err) => { console.log(err) });
        } else {
            // Posts by my followers
            res.status(422).json({ error: "We are still working on this!" });
        }
    }

}

module.exports = InstaPostController;