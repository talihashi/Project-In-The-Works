require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const {SERVER_PORT} = process.env
const {getNfts, sendNfts, getRandomNft} = require('./controller')

app.use(express.json())
app.use(cors())

app.post("/nfts", getNfts)
app.post("/nft", sendNfts)
app.get("/nfts", getRandomNft)


app.listen(SERVER_PORT, () => console.log(`The server can see you, ${SERVER_PORT}.`))