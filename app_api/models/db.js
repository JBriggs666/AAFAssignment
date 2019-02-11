require('dotenv').config();

const mongoose = require('mongoose');
const dbURI = 'mongodb://localhost/AAFAssignment';

mongoose.connect(dbURI, {
    useCreateIndex: true,
    useNewUrlParser: true
});

// display message when connected to db
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

// display message if error connecting to db
mongoose.connection.on('error', () => {
    console.log(`Mongoose connection error: ${err}`);
});

// display message when db connection closed
mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected from ${dbURI}`);
});

require('./user');
require('./media');