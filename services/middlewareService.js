const JWTService = require("./jwtService");

const middleware = (req, res, next) => {
    let authToken;
    try {
        authToken = JSON.parse(req.cookies._SID);
        authToken = authToken.key;
    } catch (err) {
        return res.status(401).json({ error: "User is not authenticated" });
    }
    if (!authToken) return res.status(401).json({ error: "User is not authenticated" });
    const payload = JWTService.verifyToken(authToken);
    if (payload) {
        req.user = payload;
        next();
    } else {
        return res.status(401).json({ error: "User is not authenticated" });
    }
}

module.exports = middleware;