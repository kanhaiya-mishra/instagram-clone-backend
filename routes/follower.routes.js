const express = require('express');
const router = express.Router();
const FollowerController = require('../controllers/follower.controller');
const middleware = require('../services/middlewareService');

router.put('/follower/:id', middleware, FollowerController.addFollower);
router.delete('/follower/:id', middleware, FollowerController.deleteFollower);

module.exports = router;