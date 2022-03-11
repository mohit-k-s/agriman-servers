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
const firebase = require('firebase/app')

let mongoConnUrl = process.env.mongoConn

const PORT = process.env.PORT || 4000 
app.use(cors())
app.use(express.json())


const firebaseConfig = {
  apiKey: "AIzaSyDkvrRFy91iZgLg6W1BWvLOH8s26z01ets",
  authDomain: "temhupr.firebaseapp.com",
  databaseURL: "https://temhupr-default-rtdb.firebaseio.com",
  projectId: "temhupr",
  storageBucket: "temhupr.appspot.com",
  messagingSenderId: "8790894031",
  appId: "1:8790894031:web:b29f3c37ad802aa45a1eba"
};

const fb_app = firebase.initializeApp(firebaseConfig)
const {getDatabase , ref , set}= require('firebase/database')

const rtdb = getDatabase(fb_app)

if(!process.env.NODE_ENV){
    let {mongoConn} = require('./consts')
    mongoConnUrl = mongoConn.url
}

// routes

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user_routes')


async function globalserver(){
    mongoose.connect(mongoConnUrl)
    mongoose.connection.once('open' , ()=>{
        console.log('connected to the auth database'.cyan)
    })
    
    app.use(authRoutes)
    app.use(userRoutes)
    app.get('/', (req, res)=>{
        res.send('agriman - servers')
    })
    app.listen(PORT , ()=>{
        console.log('listening on port 4000'.yellow)
    })
    app.post('/Fan' , (req, res) =>{
      set(ref(rtdb , 'Fan'  ) , {value : req.body.value}).then(() => res.send('done'))
    })
    app.post('/Motor' , (req, res) =>{
      set(ref(rtdb , 'Motor'  ) , {value : req.body.value}).then(() => res.send('done'))
    })
    
}

module.exports = {globalserver}