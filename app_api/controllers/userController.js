const database = require('../models/db');

const sendJSONResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
}

const addUser = (req, res) => {
    let user = {
        email: req.body.email,
        password: req.body.password
    };

    database.addUser(user, req, res, (stat, err, data) => {
        return res.json({ status: stat, data: data, error: err });
    });
};

module.exports = {
    addUser
};