const jwt = require('jsonwebtoken')
const env = require('../.env')

module.exports = (req, res, next) => {

    //CORS preflight request
    if(req.method === 'OPTIONS') {
        next()
    } else {
        const token = req.body.token || req.query.token || req.headers['Authorization']

        if(!token) {
            return res.status(403).send({errors: ['No token provided.']})
        }

        jwt.verify(token, env.authSecret, function(err, decoded) {
            if(err) {
                return res.status(403).send({errors: ['Failed to authenticate your token.']})
            } else {
                req.decoded = decoded
                next()
            }
        })
    }

}