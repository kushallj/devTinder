const express = require('express');
const profileRouter = express.Router();
const {adminAuth }= require('../middleware/auth');

profileRouter.get("/profile", adminAuth,async (req,res)=>{
    try{ 
         const user = req.user;
 
     res.send(user);} catch(err){
         res.status(400).send("Error : "+ err.message);
         console.log(err.message)
     }
 });

 module.exports = profileRouter;

