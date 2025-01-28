var express = require('express');

let app = express();

app.listen(7777,()=>{
    console.log("server is running on port 7777");
})

app.use('/test',(req,res)=>{
    res.send("testing the app");
});

app.use('/hello',(req,res)=>{
    res.send("hello my buddy");
});

