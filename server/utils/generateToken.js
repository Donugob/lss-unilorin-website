const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // jwt.sign creates a new token.
    // It takes a payload (the user's ID), a secret, and options.
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // The token will be valid for 30 days
    });
};

module.exports = generateToken;