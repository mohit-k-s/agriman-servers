// user routes
let User=require('../models/User')
let GreenHouse = require('../models/GreenHouse')
let express=require('express');
let {makeMessage} = require("../utils/templateMessages")
let router=express.Router();
router.use(express.json())

router.post('/editName' , (req, res)=>{
    User.findOne({email : req.body.email} , (err, user)=>{
        if(err) return res.send(makeMessage("" , -1)) ;
        else if(user) {
            User.findByIdAndUpdate(user._id , {name : req.body.name} , (err, user)=>{
                if(err) return res.send(makeMessage("" , -1)) ;
                if(user) return res.send(makeMessage("name updated" , 2)) ;
            })
        }else return res.send(makeMessage("" , -2)) ;
    })
})

router.post('/deleteUserAccount' , (req, res)=>{
    User.findOneAndRemove({email : req.body.email} , (err, user)=>{
        if(err) return res.send(makeMessage('' , -1))
        else if(user) return res.send(makeMessage("successfully deleted the user" , 1))
        else return res.send(makeMessage("" , -2)) ;
    })
})


router.post('/greenhouseLookup' , (req, res) =>{
    GreenHouse.findOne({greenHouseId : req.body.greenHouseId} , (err, greenHouse) =>{
        if(err) return res.send(makeMessage('', -1)) 
        else if(greenHouse)  return res.send(makeMessage("this greenhouse exists already" , 1))
        else{
            let gHouse = new GreenHouse({
                location : req.body.location,
                localServerId : req.body.localServerId,
                localServerPass : req.body.localServerPass
            })
            gHouse.save()
            return res.send(makeMessage("greenhouse created" , 2))
        }
    })
})


module.exports =  router