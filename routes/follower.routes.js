const express = require('express');
const router = express.Router();
const InstaPostController = require('../controllers/instaPost.controller');
const middleware = require('../services/middlewareService');

router.get('/insta-post', middleware, InstaPostController.getPosts);
// router.get('/insta-post/:id', middleware, InstaPostController.getParticularPost);
router.post('/insta-post', middleware, InstaPostController.createPost);
router.get('/insta-post/user/:id', middleware, InstaPostController.allUserPosts);

module.exports = router;