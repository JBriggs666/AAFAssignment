const DAL = require('../models/DBAcessLayer');

const sendJSONRepsonse = (res, status, content) => {
    res.status(status);
    res.json(content)
};

// CREATE new video Record
const addNewVideo = (req, res) => {
    if (req.body && req.body.videoFileName) {
        let newVideo = {
            videoFileName: req.body.videoFileName,
            videoLength: req.body.videoLength,
            videoFrameHeight: req.body.videoFrameHeight,
            videoFrameWidth: req.body.videoFrameWidth,
            videoDataRate: req.body.videoDataRate,
            videoTotalBitRate: req.body.videoTotalBitRate,
            videoFrameRate: req.body.videoFrameRate,
            videoAudioBitRate: req.body.videoAudioBitRate,
            VideoAudioChannels: req.body.VideoAudioChannels,
            videoAudioSampleRate: req.body.videoAudioSampleRate,
            videoSize: req.body.videoSize
        };
        DAL.addVideo(newVideo, req, res);
    } else {
        sendJSONRepsonse (res, 400, {
            "message" : "Video information required to insert new video record into database"
        })
    }
};

// READ All video in database
const getAllVideoRecords = (req, res) => {
    DAL.getAllVideoRecords(req, res);
};

// READ all video versions for specific video
const getAllVideoVersionsByID = (req, res) => {
    if (req.params && req.params.videoid) {
        let videoID = req.params.videoid;

        DAL.getAllVideoVersionsByID(videoID, req, res);

    } else {
        sendJSONRepsonse(res, 400, {
            "message" : "video id required to locate records"
        });
    }
};

// READ most recent video version
const getLatestVideoVersionByID = (req, res) => {
    if (req.params && req.params.videoid) {
        let videoID = req.params.videoid;

        DAL.getMostRecentVideoVersion(videoID, req, res);
    } else {
        sendJSONRepsonse(res, 400, {
            "message" : "video id required to locate records"
        });
    }
};

// READ specific Video Record Version
const getSpecificVideoVersion = (req, res) => {
    if (req.params && req.params.videoid && req.params.versionnumber) {
        let videoID = req.params.videoid;
        let versionNumber = req.params.versionnumber;

        DAL.getSpecificVideoVersion(videoID, versionNumber, req, res);

    } else {
        sendJSONRepsonse(res, 400, {
            "message" : "video id and version number required to locate records"
        });
    }
};

// UPDATE video with new version
const updateVideo = (req, res) => {
    if (req.body.videoFileName && req.params.videoid) {
        let videoID = req.params.videoid;
        let updatedVideo = {
            videoFileName: req.body.videoFileName,
            videoLength: req.body.videoLength,
            videoFrameHeight: req.body.videoFrameHeight,
            videoFrameWidth: req.body.videoFrameWidth,
            videoDataRate: req.body.videoDataRate,
            videoTotalBitRate: req.body.videoTotalBitRate,
            videoFrameRate: req.body.videoFrameRate,
            videoAudioBitRate: req.body.videoAudioBitRate,
            videoAudioChannels: req.body.videoAudioChannels,
            videoAudioSampleRate: req.body.videoAudioSampleRate,
            videoSize: req.body.videoSize
        }

        DAL.updateVideoByID(videoID, updatedVideo, req, res);

    } else {
        sendJSONRepsonse (res, 400, {
            "message" : "Video information required to insert new video record into database"
        })
    }
};

// DELETE video by id 
const deleteVideoByID = (req, res) => {
    if (req.params && req.params.videoid) {
        let videoID = req.params.videoid;

        DAL.deleteVideoByID(videoID, req, res);

    } else {
        sendJSONRepsonse(res, 400, {
            "message" : "video id required to locate records for deletion"
        });
    }
};

// DELETE specific video version
const deleteSpecificVideoVersion = (req, res) => {
    if (req.params && req.params.videoid && req.params.versionnumber) {
        let videoID = req.params.videoid;
        let versionNumber = req.params.versionnumber;

        DAL.deleteSpecificVideoVersion(videoID, versionNumber, req, res);
        
    } else {
        sendJSONRepsonse(res, 400, {
            "message" : "video id and version number required to locate records for deletion"
        });
    }

};

module.exports = {
    addNewVideo,
    getAllVideoRecords,
    getAllVideoVersionsByID,
    getLatestVideoVersionByID,
    getSpecificVideoVersion,
    updateVideo,
    deleteVideoByID,
    deleteSpecificVideoVersion
};