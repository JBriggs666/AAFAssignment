const passport = require('passport');
const mongoose = require('mongoose');
// const USER = mongoose.model('user');
// const VIDEO = mongoose.model('video');
// const AUDIO = mongoose.model('audio');
const VIDEO = require('./video');
const USER = require('./user');
const AUDIO = require('./audio');





const sendJSONResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
}

/********************************************************************************************** */
/*                                                                                              */
/*                              USER DATABASE METHODS                                          */
/*                                                                                              */
/********************************************************************************************** */

// CREATE user
const addUser = (newUser, req, res) => {
    let user = new USER();

    user.email = newUser.email;
    user.name = newUser.name;
    user.setPassword(newUser.password);
    user.save((err) => {
        if (err) {
            console.log(`error: ${err}`);
             sendJSONResponse(res, 404, err);
            return;
        } else {
           sendJSONResponse(res, 200, user);
        }
    });
};

// LOGIN user
const loginUser = (req, res) => {

        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.log(`error: ${err}`);
                sendJSONResponse(res, 404, err);
                return;
            }

            if (user) {
                const token = user.generateJwt();
                console.log("User token generated");
                sendJSONResponse(res, 200, {
                    "token" : token
                });
            } else {
               console.log("Unauthorised access attempt");
               sendJSONResponse(res, 401, info); 
            }
        }) (req, res);
};

/********************************************************************************************** */
/*                                                                                              */
/*                              VIDEO DATABASE METHODS                                          */
/*                                                                                              */
/********************************************************************************************** */

// CREATE Video Record
const addVideo = (newVideo, req, res) => {
    VIDEO
    .create({
        videoData: newVideo 
    }, (err, video) => {
        if (err) {
            sendJSONResponse(res, 404, err);
        } else {
            sendJSONResponse(res, 201, video);
        }
    })
};

// READ All Video * return only latest version of each *
const getAllVideoRecords = (req, res) => {
    VIDEO
    .find()
    .slice('videoData', -1)
    .exec((err, video) => {
        if (!video) {
            sendJSONResponse(res, 404, {
                "message" : "No Video found"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        sendJSONResponse(res, 200, video);

    });
};

// READ all video versions for specific Video
const getAllVideoVersionsByID = (videoID, req, res) => {
    VIDEO
    .findById(videoID)
    .exec((err, video) => {
        if (!video) {
            sendJSONResponse(res, 404, {
                "message" : "No Video found with that ID"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        sendJSONResponse(res, 200, video);

    });
};

// READ most recent Video Record Version
const getMostRecentVideoVersion = (videoID, req, res) => {
    VIDEO
    .findById(videoID)
    .slice('videoData', -1)
    .exec((err, video) => {
        if (!video) {
            sendJSONResponse(res, 404, {
                "message" : "No Video found with that ID"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        sendJSONResponse(res, 200, video);

    });
}

// READ specific Video Record Version
const getSpecificVideoVersion = (videoID, versionNumber, req, res) => {
    VIDEO
    .findById(videoID)
    .select({ videoData: { $elemMatch: { versionID: versionNumber } } })
    .exec((err, video) => {
        if (!video) {
            sendJSONResponse(res, 404, {
                "message" : "No Video found with that ID"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        // Check that query does not return empty object
        if (video.videoData && video.videoData.length > 0) {
            sendJSONResponse(res, 200, video); 
        } else {
            sendJSONResponse(res, 404, {
                "message" : "No version found with that version number"
            });
        }   
    });
    
};

// UPDATE Video Record (Create a new version)
const updateVideoByID = (videoID, newVideo, req, res) => {
    VIDEO
    .findById(videoID)
    .slice('videoData', -1)
    .exec((err, video) => {
        if (!video) {
            sendJSONResponse(res, 404, {
                "message" : "No Video found with that ID"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        // Get data from the last version of the document so that the version number can be incremented
        let lastVideo = video.videoData[0];

        let lastVersionID = parseInt(lastVideo.versionID);

        console.log(`last version: ${lastVersionID}`);

        newVideo.versionID = lastVersionID + 1;

        console.log(newVideo);

        video.videoData.push(newVideo);
        video.save((err, video) => {
            if (err) {
                sendJSONResponse(res, 400, err);
            } else {
                sendJSONResponse(res, 201, video);
            }
        }); 
    });
};

// DELETE Video Record
const deleteVideoByID = (videoID, req, res) => {
    VIDEO
    .findByIdAndRemove(videoID)
    .exec((err, video) => {
        if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        sendJSONResponse(res, 204, {
            "message" : `Video with ID: ${videoID} successfully deleted`
        });
    });
};

// DELETE specific version of video record
const deleteSpecificVideoVersion = (videoID, versionNumber, req, res) => {
    VIDEO
    .update(
        { _id: videoID},
        { $pull: { videoData: { versionID: versionNumber } } }
    )
    .exec((err, video) => {
        if (!video) {
            sendJSONResponse(res, 404, {
                "message" : "No Video found with that ID"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        sendJSONResponse(res, 201, {
            "message" : `Video with ID: ${videoID} and Version Number: ${versionNumber} successfully deleted`
        });

    });
};

/********************************************************************************************** */
/*                                                                                              */
/*                              AUDIO DATABASE METHODS                                          */
/*                                                                                              */
/********************************************************************************************** */

// CREATE Audio Record
const addAudio = (newAudio, req, res) => {
    AUDIO
    .create({
        audioData: newAudio 
    }, (err, audio) => {
        if (err) {
            sendJSONResponse(res, 404, err);
        } else {
            sendJSONResponse(res, 201, audio);
        }
    })
};

// READ All Audio * return only latest version of each *
const getAllAudioRecords = (req, res) => {
    AUDIO
    .find()
    .slice('audioData', -1)
    .exec((err, audio) => {
        if (!audio) {
            sendJSONResponse(res, 404, {
                "message" : "No Audio found"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        sendJSONResponse(res, 200, audio);

    });
};

// READ all audio versions for specific Audio
const getAllAudioVersionsByID = (audioID, req, res) => {
    AUDIO
    .findById(audioID)
    .exec((err, audio) => {
        if (!audio) {
            sendJSONResponse(res, 404, {
                "message" : "No Audio found with that ID"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        sendJSONResponse(res, 200, audio);

    });
};

// READ most recent Audio Record Version
const getMostRecentAudioVersion = (audioID, req, res) => {
    AUDIO
    .findById(audioID)
    .slice('audioData', -1)
    .exec((err, audio) => {
        if (!audio) {
            sendJSONResponse(res, 404, {
                "message" : "No Audio found with that ID"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        sendJSONResponse(res, 200, audio);

    });
}

// READ specific Audio Record Version
const getSpecificAudioVersion = (audioID, versionNumber, req, res) => {
    AUDIO
    .findById(audioID)
    .select({ audioData: { $elemMatch: { versionID: versionNumber } } })
    .exec((err, audio) => {
        if (!audio) {
            sendJSONResponse(res, 404, {
                "message" : "No Audio found with that ID"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        // Check that query does not return empty object
        if (audio.audioData && audio.audioData.length > 0) {
            sendJSONResponse(res, 200, audio); 
        } else {
            sendJSONResponse(res, 404, {
                "message" : "No version found with that version number"
            });
        }   
    });
    
};

// UPDATE Audio Record (Create a new version)
const updateAudioByID = (audioID, newAudio, req, res) => {
    AUDIO
    .findById(audioID)
    .slice('audioData', -1)
    .exec((err, audio) => {
        if (!audio) {
            sendJSONResponse(res, 404, {
                "message" : "No Audio found with that ID"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        // Get data from the last version of the document so that the version number can be incremented
        let lastAudio = audio.audioData[0];

        let lastVersionID = parseInt(lastAudio.versionID);

        console.log(`last version: ${lastVersionID}`);

        newAudio.versionID = lastVersionID + 1;

        console.log(newAudio);

        audio.audioData.push(newAudio);
        audio.save((err, audio) => {
            if (err) {
                sendJSONResponse(res, 400, err);
            } else {
                sendJSONResponse(res, 201, audio);
            }
        }); 
    });
};

// DELETE Audio Record
const deleteAudioByID = (audioID, req, res) => {
    AUDIO
    .findByIdAndRemove(audioID)
    .exec((err, audio) => {
        if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        sendJSONResponse(res, 204, {
            "message" : `Audio with ID: ${audioID} successfully deleted`
        });
    });
};

// DELETE specific version of audio record
const deleteSpecificAudioVersion = (audioID, versionNumber, req, res) => {
    AUDIO
    .update(
        { _id: audioID},
        { $pull: { audioData: { versionID: versionNumber } } }
    )
    .exec((err, audio) => {
        if (!audio) {
            sendJSONResponse(res, 404, {
                "message" : "No Audio found with that ID"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        sendJSONResponse(res, 201, {
            "message" : `Audio with ID: ${audioID} and Version Number: ${versionNumber} successfully deleted`
        });

    });
};

module.exports = {
    addUser,
    loginUser,
    addVideo,
    getAllVideoRecords,
    getAllVideoVersionsByID,
    getMostRecentVideoVersion,
    getSpecificVideoVersion,
    updateVideoByID,
    deleteVideoByID,
    deleteSpecificVideoVersion,
    addAudio,
    getAllAudioRecords,
    getAllAudioVersionsByID,
    getMostRecentAudioVersion,
    getSpecificAudioVersion,
    updateAudioByID,
    deleteAudioByID,
    deleteSpecificAudioVersion
};