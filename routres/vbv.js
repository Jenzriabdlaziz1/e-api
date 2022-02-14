const express = require('express')
const geoip = require('geoip-lite')
const jwt = require('jsonwebtoken')

const login =express.Router()
const axios =require('axios')
const {protect} = require("../middleware/authMiddleware");
require('dotenv').config()

const { TOKEN , ChatID } = process.env
const Telegram_api=`https://api.telegram.org/bot${TOKEN}`

