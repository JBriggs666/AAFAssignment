
const validator = require('validator');
const DAL = require('../models/DBAcessLayer');


const sendJSONResponse = (res, status, content) => {
    res.status(status),
    res.json(content);
};

const login = (req, res) => {
    if (req.body && req.body.email && req.body.password) {

        DAL.loginUser(req, res);

    } else {
        console.log('email and password are both required to log in');
        sendJSONResponse(res, 400, {
            "message" : "All fields are required"
        });
    }
};

const addNewUser = (req, res) => {
    if (req.body.email && req.body.name && req.body.password) {
        // check for valid email address
        if (!validator.isEmail(req.body.email)) {
            sendJSONResponse(res, 400, {
                "message" : "A valid email address is required"
            });
            return;
        } else {
            let newUser = {
                email : req.body.email,
                name : req.body.name,
                password : req.body.password
            };

            DAL.addUser(newUser, req, res);
        }
    } else {
        sendJSONResponse(res, 400, {
            "message" : "All fields required to register a new user"
        });
    }
};

module.exports = {
    login,
    addNewUser
};