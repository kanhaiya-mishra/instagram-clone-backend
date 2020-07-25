const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profile.controller');
const middleware = require('../services/middlewareService');

router.get('/user-profile/:id', middleware, ProfileController.userProfile);

module.exports = router;