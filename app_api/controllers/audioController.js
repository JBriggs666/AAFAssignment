const DAL = require('../models/DBAcessLayer');

const sendJSONRepsonse = (res, status, content) => {
    res.status(status);
    res.json(content)
};

// CREATE new audio Record
const addNewAudio = (req, res) => {
    if (req.body && req.body.audioFileName) {
        let newAudio = {
            audioFileName: req.body.audioFileName,
            audioAlbumArtist: req.body.audioAlbumArtist,
            audioAlbum: req.body.audioAlbum,
            audioAlbumYear: req.body.audioAlbumYear,
            audioTrackNumber: req.body.audioTrackNumber,
            audioGenre: req.body.audioGenre,
            audioLength: req.body.audioLength,
            audioBitRate: req.body.audioBitRate,
            audioEncodingType: req.body.audioEncodingType,
            audioFileSize: req.body.audioFileSize
        };
        DAL.addAudio(newAudio, req, res);
    } else {
        sendJSONRepsonse (res, 400, {
            "message" : "Audio information required to insert new audio record into database"
        })
    }
};

// READ All audio in database
const getAllAudioRecords = (req, res) => {
    DAL.getAllAudioRecords(req, res);
};

// READ all audio versions for specific audio
const getAllAudioVersionsByID = (req, res) => {
    if (req.params && req.params.audioid) {
        let audioID = req.params.audioid;

        DAL.getAllAudioVersionsByID(audioID, req, res);

    } else {
        sendJSONRepsonse(res, 400, {
            "message" : "Audio id required to locate records"
        });
    }
};

// READ most recent audio version
const getLatestAudioVersionByID = (req, res) => {
    if (req.params && req.params.audioid) {
        let audioID = req.params.audioid;

        DAL.getMostRecentAudioVersion(audioID, req, res);
    } else {
        sendJSONRepsonse(res, 400, {
            "message" : "audio id required to locate records"
        });
    }
};

// READ specific Audio Record Version
const getSpecificAudioVersion = (req, res) => {
    if (req.params && req.params.audioid && req.params.versionnumber) {
        let audioID = req.params.audioid;
        let versionNumber = req.params.versionnumber;

        DAL.getSpecificAudioVersion(audioID, versionNumber, req, res);

    } else {
        sendJSONRepsonse(res, 400, {
            "message" : "audio id and version number required to locate records"
        });
    }
};

// UPDATE audio with new version
const updateAudio = (req, res) => {
    if (req.body.audioFileName && req.params.audioid) {
        let audioID = req.params.audioid;
        let updatedAudio = {
            audioFileName: req.body.audioFileName,
            audioAlbumArtist: req.body.audioAlbumArtist,
            audioAlbum: req.body.audioAlbum,
            audioAlbumYear: req.body.audioAlbumYear,
            audioTrackNumber: req.body.audioTrackNumber,
            audioGenre: req.body.audioGenre,
            audioLength: req.body.audioLength,
            audioBitRate: req.body.audioBitRate,
            audioEncodingType: req.body.audioEncodingType,
            audioFileSize: req.body.audioFileSize
        }

        DAL.updateAudioByID(audioID, updatedAudio, req, res);

    } else {
        sendJSONRepsonse (res, 400, {
            "message" : "Audio information required to insert new audio record into database"
        })
    }
};

// DELETE audio by id 
const deleteAudioByID = (req, res) => {
    if (req.params && req.params.audioid) {
        let audioID = req.params.audioid;

        DAL.deleteAudioByID(audioID, req, res);

    } else {
        sendJSONRepsonse(res, 400, {
            "message" : "audio id required to locate records for deletion"
        });
    }
};

// DELETE specific audio version
const deleteSpecificAudioVersion = (req, res) => {
    if (req.params && req.params.audioid && req.params.versionnumber) {
        let audioID = req.params.audioid;
        let versionNumber = req.params.versionnumber;

        DAL.deleteSpecificAudioVersion(audioID, versionNumber, req, res);
        
    } else {
        sendJSONRepsonse(res, 400, {
            "message" : "audio id and version number required to locate records for deletion"
        });
    }

};

module.exports = {
    addNewAudio,
    getAllAudioRecords,
    getAllAudioVersionsByID,
    getLatestAudioVersionByID,
    getSpecificAudioVersion,
    updateAudio,
    deleteAudioByID,
    deleteSpecificAudioVersion
};