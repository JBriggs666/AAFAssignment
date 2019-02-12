const express = require('express');
const router =express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

const userController = require('../controllers/userController');
const videoController = require('../controllers/videoController');

// User routes
router.post('/users', userController.addNewUser);
router.post('/users/login', userController.login);

// Video routes
router.post('/media/video', videoController.addNewVideo);
router.get('/media/video', videoController.getAllVideoRecords);
router.get('/media/video/:videoid', videoController.getAllVideoVersionsByID);
router.get('/media/video/:videoid/version', videoController.getLatestVideoVersionByID);
router.get('/media/video/:videoid/version/:versionnumber', videoController.getSpecificVideoVersion);
router.put('/media/video/:videoid', videoController.updateVideo);
router.delete('/media/video/:videoid', videoController.deleteVideoByID);
router.delete('/media/video/:videoid/version/:versionnumber', videoController.deleteSpecificVideoVersion);

module.exports = router;
