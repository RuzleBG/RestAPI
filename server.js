require('dotenv').config();

const express=require('express');
const mongoose=require('mongoose');


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db=mongoose.connection
db.on('error', (error)=>{
    console.log(error);
});
db.once('open', ()=>{
    console.log('dabase opened');
});


app=express();
app.use(express.json());

const subscribersRouter=require('./routes/subscribers.js');
app.use('/subscribers', subscribersRouter);
app.listen(4000, ()=>{
    console.log("Server started on port 3000");
});
