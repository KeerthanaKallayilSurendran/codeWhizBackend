require('dotenv').config()

const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')
const cwServer = express()
require('./databse/connect')

cwServer.use(cors())
cwServer.use(express.json())
cwServer.use(routes)
const PORT = 3000 || process.env.PORT

cwServer.listen(PORT, ()=>{
    console.log(`Server started t port ${PORT} and waiting for client request`)
})

cwServer.get('/', (req, res) => {
    res.status(200).send(`<h1 style='color:Green'>Server Started and waiting for client request</h1>`)
})