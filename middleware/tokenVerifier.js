const config = require('../config/index');
const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: (req, res, next) => {

        jwt.verify(((req.headers.authorization.split(' '))[1]), config.getJWTsecret(), function (err, decoded) {
            if (err) console.log(err)
            if (decoded) {
                req.userType = decoded.userType;
                req.userId = decoded.userId;
                return next();
            } else {
                return res.status(401).send('Please log in first');
            }
        })
    }
}