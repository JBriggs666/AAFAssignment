const express = require('express');
const router =express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

const userController = require('../controllers/userController');
const mediaController = require('../controllers/mediaController');

router.post('/users', userController.addNewUser);
router.post('/users/login', userController.login);

router.post('/media', mediaController.addNewMedia);
router.get('/media', mediaController.getAllMediaRecords);
router.get('/media/:mediaid', mediaController.getAllMediaVersionsByID);
router.get('/media/:mediaid/version', mediaController.getLatestMediaVersionByID);
router.get('/media/:mediaid/version/:versionnumber', mediaController.getSpecificMediaVersion);
router.put('/media/:mediaid', mediaController.updateMedia);

module.exports = router;
