const jwt = require('jsonwebtoken');
const config = require('../config/dev');
const { JWT_SECRET } = require('../config/dev');
class JWTService {
    static createToken(data) {
        return jwt.sign(data, config.JWT_SECRET)
    }

    static verifyToken(token) {
        return jwt.verify(token, JWT_SECRET);
    }
} 

module.exports = JWTService;