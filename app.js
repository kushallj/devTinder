const express = require('express');



const connectDB = require('./configs/database');






const app = express();

const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);





connectDB()
    .then(()=>{
        console.log("connection successfully established");
        app.listen(7777,()=>{
            console.log("app is up and running")
        })
    })
    .catch((err)=>{
        console.error("Databse cannot be connected!!"+err.message);
        });





// app.get('/admin',adminAuth,(req,res,next)=>{
//     res.send('in your service')
// })

// app.use('/user',(req,res,next)=>{
//     console.log("handling the 1st route")
//     next();
// },
// (req,res,next)=>{
//     console.log("handling the 2nd route")
//     next();
//     res.send("2nd response")
// },
// (req,res,next)=>{
//     console.log("handling the 3rd route")
    
//     res.send("3rd response")
// },
// )
