const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email : String,
    name : String,
    id : String,
    password : String,
    greenHouses : [] , // the ids of greenhouses this user can see 
})

module.exports = mongoose.model('User', userSchema)