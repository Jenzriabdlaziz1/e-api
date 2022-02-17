const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const axios = require("axios");
const {protect} = require("../middleware/authMiddleware");
const http = require("http");
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
function getIp(){
    http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
        resp.on('data', function(ip) {

            return ip
        });
    });
}

module.exports = {
    generateToken,
    getIp

}

