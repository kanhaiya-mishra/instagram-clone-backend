const mongoose = require("mongoose")
const Follower = mongoose.model("Follower");
const User = mongoose.model("User");

class FollowerController {

    static addFollower(req, res) {
        const follower = req.user.username;
        const following = req.params.id;
        if (!follower || !following) return res.status(422).json({ error: "Required Parameter(s) Missing" });
        const follow = new Follower({
            follower: follower,
            following: following
        });
        follow.save()
            .then((result) => {
                if (!result) return res.status(422).json({ error: "Something went wrong, Please try again later." });
                const followUser = new Promise((resolve, reject) => {
                    resolve(User.findOne({ username: follower }, 'following'));
                });
                const followingUser = new Promise((resolve, reject) => {
                    resolve(User.findOne({ username: following }, 'followers'));
                });
                return Promise.all([followUser, followingUser])
            })
            .then((values) => {
                const followUser = new Promise((resolve, reject) => {
                    const followUserLocal = values[0];
                    followUserLocal['following']++;
                    resolve(followUserLocal.save());
                });
                const followingUser = new Promise((resolve, reject) => {
                    const followingUserLocal = values[1];
                    followingUserLocal['followers']++;
                    resolve(followingUserLocal.save());
                });
                return Promise.all([followUser, followingUser])
            })
            .then((result) => {
                if (!result[1]) return res.status(422).json({ error: "User does not exist!" });
                res.json({ followers: result[1].followers, addedFollowing: true });
            })
            .catch((err) => { console.log(err) });
    }

    static getFollowers(req, res) {
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

    static deleteFollower(req, res) {
        const follower = req.user.username;
        const following = req.params.id;
        if (!follower || !following) return res.status(422).json({ error: "Required Parameter(s) Missing" });
        Follower.deleteOne({
            follower: follower,
            following: following
        })
            .then((result) => {
                if (!result) return res.status(422).json({ error: "Something went wrong, Please try again later." });
                const followUser = new Promise((resolve, reject) => {
                    resolve(User.findOne({ username: follower }, 'following'));
                });
                const followingUser = new Promise((resolve, reject) => {
                    resolve(User.findOne({ username: following }, 'followers'));
                });
                return Promise.all([followUser, followingUser])
            })
            .then((values) => {
                const followUser = new Promise((resolve, reject) => {
                    const followUserLocal = values[0];
                    followUserLocal['following']--;
                    resolve(followUserLocal.save());
                });
                const followingUser = new Promise((resolve, reject) => {
                    const followingUserLocal = values[1];
                    followingUserLocal['followers']--;
                    resolve(followingUserLocal.save());
                });
                return Promise.all([followUser, followingUser])
            })
            .then((result) => {
                if (!result[1]) return res.status(422).json({ error: "User does not exist!" });
                res.json({ followers: result[1].followers, removedFollowing: true });
            })
            .catch((err) => { console.log(err) });
    }

    static getFollowings(req, res) {
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

module.exports = FollowerController;