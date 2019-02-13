const express = require('express');
const router =express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

const userController = require('../controllers/userController');
const videoController = require('../controllers/videoController');
const audioController = require('../controllers/audioController');

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

// Audio routes
router.post('/media/audio', audioController.addNewAudio);
router.get('/media/audio', audioController.getAllAudioRecords);
router.get('/media/audio/:audioid', audioController.getAllAudioVersionsByID);
router.get('/media/audio/:audioid/version', audioController.getLatestAudioVersionByID);
router.get('/media/audio/:audioid/version/:versionnumber', audioController.getSpecificAudioVersion);
router.put('/media/audio/:audioid', audioController.updateAudio);
router.delete('/media/audio/:audioid', audioController.deleteAudioByID);
router.delete('/media/audio/:audioid/version/:versionnumber', audioController.deleteSpecificAudioVersion);

module.exports = router;
