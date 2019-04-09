const errors = require('restify-errors'),
    User = require('../models/User'),
    bcrypt = require('bcryptjs'),
    auth = require('../auth'),
    jwt = require('jsonwebtoken'),
    config = require('../config');

module.exports = server => {
    // Register new user
    server.post('/register', (req, res, next) => {
        // Extract the email and password with object destructuring from the req.body
        const {email, password} = req.body;
        const user = new User({
            email,
            password
        });
        bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                // Hash user password
                user.password = hash;
                // Save new user
                try {
                    const newUswer = await user.save();
                    res.send(201);
                    next();
                } catch(err) {
                    return next(new errors.InternalError(err.message));
                }
            })
        })
    });
// Authenticate the user
    server.post('/auth', async (req, res, next) => {
        const {email, password} = req.body;
        try {
            // Authenticate the user
            const user = await auth.authenticate(email, password);
            // Create token for logged in user
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
                // Token expiration
                expiresIn: '15m'
            });
            // Send back response to the user with the token
            const { iat, exp} = jwt.decode(token);
            res.send({iat, exp, token});
            next();
        } catch(err) {
        // User unauthorized
            return next(new errors.UnauthorizedError(err));
        }
    })
};
