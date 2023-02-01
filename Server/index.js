const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())



app.listen(42069, () => console.log("The server can see you, 42,069."))