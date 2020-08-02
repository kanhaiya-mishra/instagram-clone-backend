module.exports = function (app) {
    app.use(require('./routes/auth.routes'));
    app.use(require('./routes/instaPost.routes'));
    app.use(require('./routes/comment.routes'));
    app.use(require('./routes/follower.routes'));
}
