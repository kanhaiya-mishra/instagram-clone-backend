const express = require('express');
const router = express.Router();
const InstaPostController = require('../controllers/instaPost.controller');
const middleware = require('../services/middlewareService');

router.get('/post', middleware, InstaPostController.getPosts);
router.post('/post', middleware, InstaPostController.createPost);

module.exports = router;