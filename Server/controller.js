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
            for(let j=0; j < savedNfts.length; j++) {
                if(savedNfts.includes(nfts[i]) || nfts[i].media[0].thumbnail === false) {
                    continue
                } else {
                    savedNfts.push(nfts[i])
                }
            }
        }
        console.log(savedNfts)
        res.status(200).send("Nfts added successfully.")
        //loop through nfts array
        //check if nft already exists within savedNfts
        //if it doesn't push nft into the saved nfts
        //if it is then skip it
        //check if contains an image, if not do not save
        //once finished send 200 status with string nfts added successfuly
    },

    getRandomNft: (req, res) => {
        let rando = Math.ceil(Math.random()*savedNfts.length - 1)
        let rando1 = Math.ceil(Math.random()*savedNfts.length - 1)
        let rando2 = Math.ceil(Math.random()*savedNfts.length - 1)
        res.send([...savedNfts[rando], [rando1], [rando2]])
    }
    //add a getRandomNft method
    //grab random nft from savedNfts and send that to the front

}