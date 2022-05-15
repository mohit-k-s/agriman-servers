///AUTH ROUTES
var User=require('../models/User')
var express=require('express');
let {makeMessage} = require("../utils/templateMessages")
var router=express.Router();
router.use(express.json())




router.post('/signupOrlookup',(req,res)=>{
    console.log(req.body)
    User.findOne({email : req.body.email}, (err, user) =>{
        if(err) return res.send(makeMessage("" , -1)) ;
        else if(user) return res.send( makeMessage('a user with this name exists', 1)) 
        else{
            // user not exists , register this user
            let nuser=new User({
                email: req.body.email,
                name : "randomName",
                password : req.body.password
            });
            nuser.save()
            res.send(makeMessage("user registered" , 2)) ;
        }
    })    
})



module.exports=router