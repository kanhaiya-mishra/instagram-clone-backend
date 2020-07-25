const mongoose = require("mongoose")
const InstaPost = mongoose.model("InstaPost");
const User = mongoose.model("User");

class ProfileController {

    static userProfile(req, res) {
        const username = req.params.id;
        if (!username) return res.status(422).json({ error: "Required Parameter(s) Missing" });
        const userDetails = new Promise((resolve, reject) => {
            resolve(User.findOne({ username }, 'name username followers following'));
        });
        const userPosts = new Promise((resolve, reject) => {
            resolve(InstaPost.find({ postOwnerUsername: username }));
        });
        Promise.all([userDetails, userPosts])
            .then((values) => {
                if (!values[0]) return res.status(422).json({ error: "User does not exist!" });
                const userProfile = {
                    name: values[0].name,
                    username: values[0].username,
                    followers: values[0].followers,
                    following: values[0].following
                };
                const instaPosts = values[1];
                res.json({ userProfile, instaPosts });
            })
            .catch((err) => { console.log(err) });
    }
}

module.exports = ProfileController;