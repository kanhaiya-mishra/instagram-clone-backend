const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller');
const middleware = require('../services/middlewareService');

router.get('/comment/:id', middleware, CommentController.getComments);
router.post('/comment', middleware, CommentController.addComment );
router.put('/comment', middleware, CommentController.updateComment);
router.delete('/comment/:id', middleware, CommentController.deleteComment);

module.exports = router;