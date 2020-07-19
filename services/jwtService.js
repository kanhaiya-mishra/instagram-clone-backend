const jwt = require('jsonwebtoken');
const config = require('../config');
const { JWT_SECRET } = require('../config');
class JWTService {
    static createToken(data) {
        return jwt.sign(data, config.JWT_SECRET)
    }

    static verifyToken(token) {
        return jwt.verify(token, JWT_SECRET);
    }
} 

module.exports = JWTService;