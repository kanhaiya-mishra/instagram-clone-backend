const JWTService = require("./jwtService");

const middleware = () => {
    return function (req, res, next) {
        const authToken = JSON.parse(req.cookies.token);
        if (!authToken) return res.status(401).json({ error: "User is not authenticated" });
        authToken = authToken.replace("Bearer ", "");
        return JWTService.verifyToken(authToken).then((err, payload) => {
            if (err) return res.status(401).json({ error: "User is not authenticated" });
            req.user = payload;
            next();
        })
    }

}

module.exports = middleware;