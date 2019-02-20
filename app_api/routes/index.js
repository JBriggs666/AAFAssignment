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
router.post('/media/video', auth, videoController.addNewVideo);
router.get('/media/video', auth, videoController.getAllVideoRecords);
router.get('/media/video/search', auth, videoController.searchVideoRecords);
router.get('/media/video/:videoid', auth, videoController.getAllVideoVersionsByID);
router.get('/media/video/:videoid/version', auth, videoController.getLatestVideoVersionByID);
router.get('/media/video/:videoid/version/:versionnumber', auth, videoController.getSpecificVideoVersion);
router.put('/media/video/:videoid', auth, videoController.updateVideo);
router.patch('/media/video/:videoid', auth, videoController.updateFileLock);
router.delete('/media/video/:videoid', auth, videoController.deleteVideoByID);
router.delete('/media/video/:videoid/version/:versionnumber', auth, videoController.deleteSpecificVideoVersion);


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
