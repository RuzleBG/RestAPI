const mongoose = require("mongoose");

const subcriber_schema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    subscribedToChannel:{
        type:String,
        required: true
    },
    subscribeDate:{
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports=mongoose.model('Subscriber', subcriber_schema)