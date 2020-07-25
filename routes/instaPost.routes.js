const express = require('express');
const router = express.Router();
const InstaPostController = require('../controllers/instaPost.controller');
const middleware = require('../services/middlewareService');

router.get('/insta-post', middleware, InstaPostController.getPosts);
router.post('/insta-post', middleware, InstaPostController.createPost);

module.exports = router;