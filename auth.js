const bcrypt = require('bcryptjs'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Get the incoming user by their email
            const user = await User.findOne({email});
            // Match found user password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    resolve(user);
                } else {
                    // If user password does not match
                    reject('Authentication Failed');
                }
            });
        } catch(err) {
            // User can not be found by their email
            reject('Authentication Failed');
        }
    })
};
