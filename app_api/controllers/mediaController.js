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

// READ most recent media version
const getMediaByID = (req, res) => {
    if (req.params && req.params.mediaid) {
        let mediaID = req.params.mediaid;

        DAL.getMedia(mediaID, req, res);
    } else {
        sendJSONRepsonse(res, 400, {
            "message" : "media id required to locate records"
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

        DAL.updateMedia(mediaID, updatedMedia, req, res);

    } else {
        sendJSONRepsonse (res, 400, {
            "message" : "Media information required to insert new media record into database"
        })
    }
};

module.exports = {
    addNewMedia,
    getMediaByID,
    updateMedia
};