const express=require('express');
const { json } = require('express/lib/response');
const routes=express.Router();
const Subscriber=require('../models/subscriber');

//Getting All
routes.get('/',async (req,res,)=>{
    try{
        const subscribers=await Subscriber.find()
        res.json(subscribers);
    }
    catch{
        res.status(500).send(json({
            message: err.message
        }))
    }
});
//Getting One
routes.get('/:id',getSubscriber,(req,res)=>{
    res.send(res.subscriber);
})
//Creating One
routes.post('/',async (req,res)=>{
    const newMember=new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel,
        subscribeDate: req.body.subscribeDate
    });
    try{
        const newSubscriber=await newMember.save();
        res.status(201).json(newSubscriber);
    }
    catch (err) {
        res.status(400).json({message: err.message});
    }
});
//Updating One
routes.patch('/:id', getSubscriber, async(req,res)=>{
    if(req.body.name!=null){
        res.subscriber.name=req.body.name;
    }
    if(req.body.subscribedToChannel!=null){
        res.subscriber.subscribedToChannel=req.body.subscribedToChannel;
    }
    if(req.body.subscribeDate!=null){
        res.subscriber.subscribeDate=req.body.subscribeDate;
    }
    try{
        const newSubscriber=await res.subscriber.save();
        res.json(newSubscriber);

    }
    catch (err){
        res.status(400).json({message: err.message});

    }
})
///Deleting One
routes.delete('/:id', getSubscriber, async(req,res)=>{
    try{
        await res.subscriber.remove();
        res.json({message: "Successfully deleted"});
    }
    catch (err){
        res.status(500).json({message:err.message});
    }
})

async function getSubscriber(req,res,next){
    let subscriber;
    try{
        subscriber= await Subscriber.findById(req.params.id);
        if(subscriber==null){
            return res.status(404).json({message: "Cannot Find Subscriber"});
        }
    }
    catch (err){
        return res.status(500).json({message: err.message})
    }
    res.subscriber=subscriber;
    next();
}

module.exports=routes;