const mongoose = require("mongoose")
const InstaPost = mongoose.model("InstaPost");

class InstaPostController {

    static createPost(req, res) {
        const { imageURL, caption } = req.body;
        if (!imageURL) return res.status(422).json({ error: "Required Parameter(s) Missing" });
        const Post = new InstaPost({
            imageURL,
            caption,
            postOwnerUsername: req.user.username,
            postOwner: {
                name: req.user.name,
                username: req.user.username,
                profilePicURL: req.user.profilePicURL
            }
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