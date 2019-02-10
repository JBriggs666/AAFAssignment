const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const dbURI = 'mongodb://localhost:27017';
const dbName = 'AAFAssignment';
const client = new MongoClient(dbURI);

// USERS

// CREATE New User
const addUser = (user, req, res, next) => {
    client.connect((err) => {
        const db = client.db(dbName);
        const collection = db.collection('Users');

        collection.insert(user, ((err, result) => {
            if (err) {
                console.log(err);
                next(false, err, []);
            }
            next(true, [], result)
        }));
    });
};

const getAllUsers = (req, res) => {
    
};


module.exports = {
    addUser,
    getAllUsers
};
