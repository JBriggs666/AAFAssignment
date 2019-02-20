const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    // Create new test database locally, so main database is unharmed
    mongoose.connect('mongodb://localhost:27017/videoTest', {
        useCreateIndex: true,
        useNewUrlParser: true
    });
    mongoose.connection
    .once('open', () => {
        done();
    })
    .on('error', (error) => {
        console.warn('Error', error);
    });
});

after((done) => {
    // delete test collection once testing complete
    mongoose.connection.collections.videos.drop(() => {
        done();
    });
});