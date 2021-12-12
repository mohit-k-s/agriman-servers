/**
 * Contains the global server code for agriman this will handle auth routes as well as act as a sink for the data 
 * fed by the local servers .
 * Author : mohit-k-s
 */

const express = require('express')
const _ = require('colors')
const app = express()
const mongoose = require('mongoose')
const mysql = require('mysql')
const cors = require('cors')
const {mongoConn} = require('./consts')
if(mongoConn == null) {
    mongoConn = process.env.mongoConn
}
const PORT = process.env.PORT || 4000 
app.use(cors())
app.use(express.json())

// routes

const authRoutes = require('./routes/auth')


mongoose.connect(mongoConn.url)
mongoose.connection.once('open' , ()=>{
    console.log('connected to the auth database'.cyan)
})


async function globalserver(){
    app.use(authRoutes)
    app.get('/', (req, res)=>{
        res.send('agriman - servers')
    })
    app.listen(PORT , ()=>{
        console.log('listening on port 4000'.yellow)
    })
    
}

module.exports = {globalserver}