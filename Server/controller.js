require('dotenv').config()
const axios = require('axios')
const {API_KEY, CONNECTION_STRING} = process.env

module.exports = {
    getNfts: (req, res) => {
        const {walletId} = req.body
        axios.get(`https://eth-mainnet.g.alchemy.com/nft/v2/${API_KEY}/getNFTs?owner=${walletId}`).then(result => {
            res.status(200).send(result.data)
        }).catch(err => {
            res.status(400).send({err, message: "Error getting Nft's check the wallet address."})
        })
    }
}