const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
module.exports = {
    generateToken
}
