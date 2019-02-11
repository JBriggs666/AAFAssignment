const DAL = require('../models/DBAcessLayer');

const sendJSONRepsonse = (res, status, content) => {
    res.status(status);
    res.json(content)
};

// CREATE new media
const addNewMedia = (req, res) => {
    if (req.body) {
        let newMedia = {
            FileName: req.body.FileName,
            AudioChannelCount: req.body.AudioChannelCount,
            AudioEncodingBitrate: req.body.AudioEncodingBitrate,
            AudioEncodingFormat: req.body.AudioEncodingFormat,
            AudioSampleRate: req.body.AudioSampleRate,
            AudioSampleSize: req.body.AudioSampleSize,
            DRM: req.body.DRM,
            MediaDuration: req.body.MediaDuration,
            VideoCompression: req.body.VideoCompression,
            VideoEncodingBitRate: req.body.VideoEncodingBitRate,
            VideoFrameHeight: req.body.VideoFrameHeight,
            VideoFrameWidth: req.body.VideoFrameWidth,
            VideoFrameRate: req.body.VideoFrameRate,
            VideoTotalBitRate: req.body.VideoTotalBitRate 
        };
        DAL.addMedia(newMedia, req, res);
    } else {
        sendJSONRepsonse (res, 400, {
            "message" : "Media information required to insert new media record into database"
        })
    }
};

// READ All media in database
const getAllMediaRecords = (req, res) => {
    DAL.getAllMediaRecords(req, res);
};

// READ all media versions for specific Media
const getAllMediaVersionsByID = (req, res) => {
    if (req.params && req.params.mediaid) {
        let mediaID = req.params.mediaid;

        DAL.getAllMediaVersionsByID(mediaID, req, res);

    } else {
        sendJSONRepsonse(res, 400, {
            "message" : "media id required to locate records"
        });
    }
};

// READ most recent media version
const getLatestMediaVersionByID = (req, res) => {
    if (req.params && req.params.mediaid) {
        let mediaID = req.params.mediaid;

        DAL.getMostRecentMediaVersion(mediaID, req, res);
    } else {
        sendJSONRepsonse(res, 400, {
            "message" : "media id required to locate records"
        });
    }
};

// READ specific Media Record Version
const getSpecificMediaVersion = (req, res) => {
    if (req.params && req.params.mediaid && req.params.versionnumber) {
        let mediaID = req.params.mediaid;
        let versionNumber = req.params.versionnumber;

        DAL.getSpecificMediaVersion(mediaID, versionNumber, req, res);

    } else {
        sendJSONRepsonse(res, 400, {
            "message" : "media id and version number required to locate records"
        });
    }
};

// UPDATE media with new version
const updateMedia = (req, res) => {
    if (req.body && req.params.mediaid) {
        let mediaID = req.params.mediaid;
        let updatedMedia = {
            FileName: req.body.FileName,
            AudioChannelCount: req.body.AudioChannelCount,
            AudioEncodingBitrate: req.body.AudioEncodingBitrate,
            AudioEncodingFormat: req.body.AudioEncodingFormat,
            AudioSampleRate: req.body.AudioSampleRate,
            AudioSampleSize: req.body.AudioSampleSize,
            DRM: req.body.DRM,
            MediaDuration: req.body.MediaDuration,
            VideoCompression: req.body.VideoCompression,
            VideoEncodingBitRate: req.body.VideoEncodingBitRate,
            VideoFrameHeight: req.body.VideoFrameHeight,
            VideoFrameWidth: req.body.VideoFrameWidth,
            VideoFrameRate: req.body.VideoFrameRate,
            VideoTotalBitRate: req.body.VideoTotalBitRate  
        }

        DAL.updateMediaByID(mediaID, updatedMedia, req, res);

    } else {
        sendJSONRepsonse (res, 400, {
            "message" : "Media information required to insert new media record into database"
        })
    }
};

// DELETE media by id 
const deleteMediaByID = (req, res) => {

};

// DELETE specific media version
const deleteSpecificMediaVersion = (req, res) => {

};

module.exports = {
    addNewMedia,
    getAllMediaRecords,
    getAllMediaVersionsByID,
    getLatestMediaVersionByID,
    getSpecificMediaVersion,
    updateMedia,
    deleteMediaByID,
    deleteSpecificMediaVersion
};