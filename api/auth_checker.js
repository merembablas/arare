const jwt = require('jsonwebtoken')
const config = require('./config')

/**
 * Middleware function to check is user authorized to access specific endpoints.
 */
function isAuthenticated(req, res, next) {
    const token = req.headers.authorization
    console.log("🚀 ~ file: config.js ~ line 10 ~ isAuthenticated ~ token", token)
    if (token) {
        jwt.verify(token.replace(/^Bearer\s/, ''), config.secret, function (err, decoded) {
            if (err) {
                return res.status(401).json({ message: 'unauthorized' })
            } else {
                req.currentUser = decoded
                return next();
            }
        });
    }
    else {
        return res.status(401).json({ message: 'unauthorized' })
    }
}

export { isAuthenticated }


