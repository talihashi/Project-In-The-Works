require('dotenv').config()
const axios = require('axios')
const {API_KEY, CONNECTION_STRING} = process.env

const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

let savedNfts = require('./db.json')

module.exports = {
    getNfts: (req, res) => {
        const {walletId} = req.body
        axios.get(`https://eth-mainnet.g.alchemy.com/nft/v2/${API_KEY}/getNFTs?owner=${walletId}`).then(result => {
            res.status(200).send(result.data)
        }).catch(err => {
            res.status(400).send({err, message: "Error getting Nft's check the wallet address."})
        })
    },

    sendNfts: (req, res) => {
        const {nfts} = req.body
        for(let i=0; i < nfts.length; i++) {
            if(savedNfts.includes(nfts[i]) || nfts[i].media[0].thumbnail === false) {
                continue
            } else {
                savedNfts.push(nfts[i])
            }
        }
        res.status(200).send("Nfts added successfully.")
    },

    getRandomNft: (req, res) => {
        const randoHolder = []
        let rando = Math.floor(Math.random()*savedNfts.length)
        let rando1 = Math.floor(Math.random()*savedNfts.length)
        let rando2 = Math.floor(Math.random()*savedNfts.length)
        let rando3 = Math.floor(Math.random()*savedNfts.length)
        let rando4 = Math.floor(Math.random()*savedNfts.length)
        let rando5 = Math.floor(Math.random()*savedNfts.length)
        randoHolder.push(savedNfts[rando], savedNfts[rando1], savedNfts[rando2], savedNfts[rando3], savedNfts[rando4], savedNfts[rando5])
        res.status(200).send(randoHolder)
    }

}