///AUTH ROUTES
var User=require('../models/User')
var express=require('express');
var router=express.Router();
router.use(express.json())

router.post('/signupOrlookup',(req,res)=>{
    User.findOne({username : req.body.username}, (err, user) =>{
        if(err) return res.send( { message : 'unable to look up right now', code : 0})
        else if(user) return res.send( {message : 'a user with this name exists', code : 1})
        else{
            // user not exists , register this user
            let nuser=new User({
                email:req.body.email,
                password : req.body.password
            });
            nuser.save()
            res.send({message : 'user registered in db', code : 2})
        }
    })

    
})


module.exports=router