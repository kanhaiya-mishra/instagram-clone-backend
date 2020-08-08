const mongoose = require("mongoose")
const InstaPost = mongoose.model("InstaPost");
const User = mongoose.model("User");
const Follower = mongoose.model("Follower");

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

    static allUserPosts(req, res) {
        const username = req.params.id;
        const requestingUser = req.user.username;
        if (!username) return res.status(422).json({ error: "Required Parameter(s) Missing" });
        const userDetails = new Promise((resolve, reject) => {
            resolve(User.findOne({ username }, 'name username followers following'));
        });
        const userPosts = new Promise((resolve, reject) => {
            resolve(InstaPost.find({ postOwnerUsername: username }));
        });
        const isFollowing = new Promise((resolve, reject) => {
            if (requestingUser === username) {
                resolve(false);
            } else {
                resolve(Follower.findOne({ follower: requestingUser, following: username }));
            }
        });
        Promise.all([userDetails, userPosts, isFollowing])
            .then((values) => {
                if (!values[0]) return res.status(422).json({ error: "User does not exist!" });
                const userProfile = {
                    name: values[0].name,
                    username: values[0].username,
                    followers: values[0].followers,
                    following: values[0].following,
                    isFollowing: values[2]
                };
                const instaPosts = values[1];
                res.json({ userProfile, instaPosts });
            })
            .catch((err) => { console.log(err) });
    }

}

module.exports = InstaPostController;