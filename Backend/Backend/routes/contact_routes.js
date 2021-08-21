const express = require('express');

const router = express.Router();

const Contact=require('../models/contacts_schema')


router.post('/addContact',(req,res)=>{
    Contact.create({
        name:req.body.name,
        phone:req.body.phone,
        address:req.body.address,
        notes:req.body.notes
    },(err,contact)=>{
        if(err){
            res.status(500).send({ "Data": err, "message": "Failed in Adding new Contact...!", "status": false })
        }
        else{
            res.status(200).send({"Data":contact, "message":"Contact is Added Successfully" , "status":true})
        }
    })
});

router.get('/getAll',(req,res)=>{
    Contact.find({},(err,contacts)=>{
        if (err) {
            res.status(500).send({ "Data": err, "message": "Failed  getting Contacts ...!", "status": false })
        } else {
            res.status(200).send({ "Data": contacts, "message": "All Contacts retrieved Successfully..!", "status": true })
        }
    })
});
router.get('/getOne/:id',(req,res)=>{
    Contact.find({_id:req.params.id},(err,contacts)=>{
        if (err) {
            res.status(500).send({ "Data": err, "message": "Failed  getting Contact ...!", "status": false })
        } else {
            res.status(200).send({ "Data": contacts, "message": "Contact retrieved Successfully..!", "status": true })
        }
    })
});

router.put('/edit/:id',(req,res)=>{
    Contact.findByIdAndUpdate({_id:req.params.id},
        {
        name:req.body.name,
        phone:req.body.phone,
        address:req.body.address,
        notes:req.body.notes
    }, (err,contact)=>{
        if(err){
            res.status(500).send({"Data":err,"message":"Failed Updating Contact", "status":false})
        }
        else{
            res.status(200).send({"Data":contact, "message":"Contact is Updated Successfully", "status":true })
        }
    })
});
router.delete('/delete/:id',(req,res)=>{
    Contact.findByIdAndDelete({_id:req.params.id},(err,contact)=>{
        if(err){
            res.status(500).send({"Data":err,"message":"Error Deleting Contact","status":failed})
        }
        else{
            res.status(200).send({"Data":contact,"message":"Contact is Deleted Successfully", "status":true})
        }
    })
});

router.get('/getbyName/:name',(req,res)=>{
    Contact.find({name:{'$regex':req.params.name}},(err,contact)=>{
        if(err){
            res.status(500).send({"Data":err,"message":"Error Getting Contact","status":failed})

        }
        else{
            res.status(200).send({"Data":contact,"message":"Contact Retrieved Successfully", "status":true})
        }
    })
})


module.exports= router;