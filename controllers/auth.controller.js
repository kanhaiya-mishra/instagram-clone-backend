const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require('bcrypt');
const config = require('../config');
const JWTService = require("../services/jwtService");

class AuthController {

    static signIn(req, res) {
        const { email, password } = req.body;
        let user = {};
        if (!email || !password || !name) return res.status(422).json({ error: "Required Parameter(s) Missing" });
        User.findOne({ email })
            .then((savedUser) => {
                if (!savedUser) return res.status(422).json({ error: "Invalid Username or Password" });
                // decryt password
                user = savedUser;
                return bcrypt.compare(password, savedUser.password)
            })
            .then((doMatch) => {
                if (doMatch) {
                    const token = JWTService.createToken({ id: user.id, email: user.email });
                    return res.json({ name: user.name, email: user.email });
                }
                return res.status(422).json({ error: "Invalid Username or Password" });
            })
            .catch((err) => { console.log(err) })
    }

    static signUp(req, res) {
        const { name, email, password } = req.body;
        if (!email || !password || !name) return res.status(422).json({ error: "Required Parameter(s) Missing" });
        User.findOne({ email })
            .then((savedUser) => {
                if (savedUser) return res.status(422).json({ error: "User already exists with this email" });
                return bcrypt.hash(password, config.SALT_ROUNDS);
            })
            .then((hashedPassword) => {
                const user = new User({ name, email, password: hashedPassword });
                return user.save();
            })
            .then((user) => {
                res.json({ message: "Successfull" });
            })
            .catch((err) => { console.log(err) })
    }
}

module.exports = AuthController;