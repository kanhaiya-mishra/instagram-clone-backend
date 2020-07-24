const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require('bcrypt');
const config = require('../config');
const JWTService = require("../services/jwtService");

class AuthController {

    static signIn(req, res) {
        const { username, password } = req.body;
        let user = {};
        if (!username || !password) return res.status(422).json({ error: "Required Parameter(s) Missing" });
        User.findOne({ username })
            .then((savedUser) => {
                if (!savedUser) return res.status(422).json({ error: "Invalid Username or Password" });
                // decryt password
                user = savedUser;
                return bcrypt.compare(password, savedUser.password)
            })
            .then((doMatch) => {
                if (doMatch) {
                    const token = JWTService.createToken({ id: user.id, username: user.username });
                    res.cookie('_SID', JSON.stringify({ key: token }), { maxAge: null, httpOnly: true });
                    return res.json({ name: user.name, username: user.username });
                }
                return res.status(422).json({ error: "Invalid Username or Password" });
            })
            .catch((err) => { console.log(err) })
    }

    static signUp(req, res) {
        const { name, username, password } = req.body;
        if (!username || !password || !name) return res.status(422).json({ error: "Required Parameter(s) Missing" });
        User.findOne({ username })
            .then((savedUser) => {
                if (savedUser) return res.status(422).json({ error: "User already exists with this username" });
                return bcrypt.hash(password, config.SALT_ROUNDS);
            })
            .then((hashedPassword) => {
                const user = new User({ name, username, password: hashedPassword });
                return user.save();
            })
            .then(() => {
                res.json({ message: "Successful" });
            })
            .catch((err) => { console.log(err) })
    }

    static signOut(req, res) {
        res.clearCookie('_SID');
        res.json({ message: "Successful" });
    }
}

module.exports = AuthController;