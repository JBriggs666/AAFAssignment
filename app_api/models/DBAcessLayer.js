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

// READ most recent Media Record
const getMedia = (mediaID, req, res) => {
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

// UPDATE Media Record
const updateMedia = (mediaID, newMedia, req, res) => {
    MEDIA
    .findById(mediaID)
    .select('mediaData')
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

        media.mediaData.push(newMedia);
        media.save((err, media) => {
            if (err) {
                sendJSONResponse(res, 400, err);
            } else {
                sendJSONResponse(res, 201, media);
            }
        }); 
    });
}

module.exports = {
    addUser,
    loginUser,
    addMedia,
    getMedia,
    updateMedia
};