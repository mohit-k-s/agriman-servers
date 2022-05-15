const mongoose = require('mongoose')

// for when we register a greenhouse
const greenHouseSchema = mongoose.Schema({
    location : String ,
    id : String ,
    localServerId : String ,
    localServerPassword : String,
})


module.exports = mongoose.model('GreenHouse', greenHouseSchema)