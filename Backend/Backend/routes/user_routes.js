const express = require('express');

const router = express.Router();

const User=require('../models/users_schema')

router.post('/login',(req,res)=>{
    const username=req.body.user;
    const password=req.body.password;
    // console.log("username",username);

    // console.log("password",password);
    // console.log("req.body",req.body);
    
    User.findOne({user:req.body.user},(err,user)=>{

        if(user){
                if(user.password==password){
                    res.status(200).send({"Data":user,"message":"Logged in Successfully", "status":true})
                }
                else{
                    res.send({"message":"Incorrect Username or Password"})
                }
            }

        else if(!user){
            res.send({"message":"Incorrect Username or Password!!!!"})

        }
        else{
           res.status(500).send({"Data":err,"message":"Error in Logging in", "status":false})


        }
    })
})

module.exports= router;