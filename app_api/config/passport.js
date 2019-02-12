const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const USER = mongoose.model('user');

passport.use(new localStrategy(
    {
        usernameField: 'email'
    },
    (username, password, done) => {
        USER
            .findOne(
                { 
                    email : username 
                }
            )
            .exec((err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, {
                        "message" : 'Username or Password not recognised'
                    });
                }

                if (!user.verifyPassword(password)) {
                    return done(null, false, {
                        "message" : 'Username or Password not recognised'
                    });
                }

                return done(null, user);
            });
    } 
));