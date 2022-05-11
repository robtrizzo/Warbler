const db = require('../models'); // implicitly gets index.js
const jwt = require('jsonwebtoken');

exports.signin = async function (req, res, next) {
    try {
        // finding a user
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImageUrl } = user;
        // check if their password matches what was sent to the server
        let isMatch = await user.comparePassword(req.body.password);
        // if it all matches
        if (isMatch) {
            // log them in
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: 'Invalid Email/Password'
            });
        }
    } catch (err) {
        return next({
            status: 400,
            message: 'Invalid Email/Password'
        });
    }
};

exports.signup = async function (req, res, next) {
    try {
        // create a user
        let user = await db.User.create(req.body);
        let { id, username, profileImageUrl } = user;
        // create a token (signing a token)
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
    } catch (err) {
        // if the mongoose schema validation fails
        if (err.code === 11000) {
            err.message = 'Sorry, that username and/or email is taken';
        }
        // otherwise, return generic error
        return next({
            status: 400,
            message: err.message
        })
    }
};