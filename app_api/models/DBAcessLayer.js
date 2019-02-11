const passport = require('passport');
const mongoose = require('mongoose');
const USER = mongoose.model('user');
const MEDIA = mongoose.model('media');


const sendJSONResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
}

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


// CREATE Media Record
const addMedia = (newMedia, req, res) => {
    MEDIA
    .create({
        mediaData: newMedia 
    }, (err, media) => {
        if (err) {
            sendJSONResponse(res, 404, err);
        } else {
            sendJSONResponse(res, 201, media);
        }
    })
};

// READ All Media * return only latest version of each *
const getAllMediaRecords = (req, res) => {
    MEDIA
    .find()
    .slice('mediaData', -1)
    .exec((err, media) => {
        if (!media) {
            sendJSONResponse(res, 404, {
                "message" : "No Media found"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        sendJSONResponse(res, 200, media);

    });
};

// READ all media versions for specific Media
const getAllMediaVersionsByID = (mediaID, req, res) => {
    MEDIA
    .findById(mediaID)
    .exec((err, media) => {
        if (!media) {
            sendJSONResponse(res, 404, {
                "message" : "No Media found with that ID"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        sendJSONResponse(res, 200, media);

    });
};

// READ most recent Media Record Version
const getMostRecentMediaVersion = (mediaID, req, res) => {
    MEDIA
    .findById(mediaID)
    .slice('mediaData', -1)
    .exec((err, media) => {
        if (!media) {
            sendJSONResponse(res, 404, {
                "message" : "No Media found with that ID"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        sendJSONResponse(res, 200, media);

    });
}

// READ specific Media Record Version
const getSpecificMediaVersion = (mediaID, versionNumber, req, res) => {
    MEDIA
    .findById(mediaID)
    .select({ mediaData: { $elemMatch: { versionID: versionNumber } } })
    .exec((err, media) => {
        if (!media) {
            sendJSONResponse(res, 404, {
                "message" : "No Media found with that ID"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        // Check that query does not return empty object
        if (media.mediaData && media.mediaData.length > 0) {
            sendJSONResponse(res, 200, media); 
        } else {
            sendJSONResponse(res, 404, {
                "message" : "No version found with that version number"
            });
        }   
    });
    
};

// UPDATE Media Record (Create a new version)
const updateMediaByID = (mediaID, newMedia, req, res) => {
    MEDIA
    .findById(mediaID)
    .slice('mediaData', -1)
    .exec((err, media) => {
        if (!media) {
            sendJSONResponse(res, 404, {
                "message" : "No Media found with that ID"
            });
            return;
        } else if (err) {
            sendJSONResponse(res, 404, err);
            return;
        }

        // Get data from the last version of the document so that the version number can be incremented
        let lastMedia = media.mediaData[0];

        let lastVersionID = parseInt(lastMedia.versionID);

        console.log(`last version: ${lastVersionID}`);

        newMedia.versionID = lastVersionID + 1;

        console.log(newMedia);

        media.mediaData.push(newMedia);
        media.save((err, media) => {
            if (err) {
                sendJSONResponse(res, 400, err);
            } else {
                sendJSONResponse(res, 201, media);
            }
        }); 
    });
};

// DELETE Media Record
const deleteMediaByID = (mediaID, req, res) => {

};

// DELETE specific version of media record
const deleteSpecificMediaVersion = (mediaID, versionNUmber, req, res) => {

};

module.exports = {
    addUser,
    loginUser,
    addMedia,
    getAllMediaRecords,
    getAllMediaVersionsByID,
    getMostRecentMediaVersion,
    getSpecificMediaVersion,
    updateMediaByID,
    deleteMediaByID,
    deleteSpecificMediaVersion
};