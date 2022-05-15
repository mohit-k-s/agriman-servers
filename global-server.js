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

let {mongoConn, FIREBASE_API_KEY} = require('./consts')
let mongoConnUrl = mongoConn.url

const PORT = process.env.PORT || 4000 
app.use(cors())
app.use(express.json())


const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "final-project-6a70d.firebaseapp.com",
  databaseURL: "https://final-project-6a70d-default-rtdb.firebaseio.com",
  projectId: "final-project-6a70d",
  storageBucket: "final-project-6a70d.appspot.com",
  messagingSenderId: "1098542205114",
  appId: "1:1098542205114:web:4a96feb29bbfaafd4eda83"
};

const fb_app = firebase.initializeApp(firebaseConfig)
const {getDatabase , ref , set}= require('firebase/database')

const rtdb = getDatabase(fb_app)


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