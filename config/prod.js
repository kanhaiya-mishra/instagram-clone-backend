module.exports = {
   PORT: 5000,
   MONGO_URL: process.env.MONGO_URL,
   SALT_ROUNDS: 12,
   JWT_SECRET: process.env.JWT_SECRET
}