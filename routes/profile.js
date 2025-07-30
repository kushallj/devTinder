const express = require('express');
const profileRouter = express.Router();
const {adminAuth }= require('../middleware/auth');
const {validateProfileFields, validatePassword} = require('../utils/validate');
const bcrypt = require('bcrypt');

profileRouter.get("/profile/view", adminAuth,async (req,res)=>{
    try{ 
         const user = req.user;
 
     res.send(user);} catch(err){
         res.status(400).send("Error : "+ err.message);
         console.log(err.message)
     }
 });

 profileRouter.patch('/profile/update',adminAuth, async (req, res)=> {
    try{
       const isEdit = validateProfileFields(req);

       if(!isEdit){
            throw new Error("Invalid fields provided for update");
        }

       
        const loggedInUser = req.user;
        
        Object.keys(req.body).forEach((key)=>
                loggedInUser[key] = req.body[key]
            );

        await loggedInUser.save();

        res.json({message:`${loggedInUser.firstName}, your profile updated successfully`,
            data: loggedInUser
        });
        
    } catch(err){
        res.status(400).send("Error : "+ err.message);
        console.log(err.message);
    }
 })

 profileRouter.patch('/profile/password',adminAuth, async (req,res)=> {
        const checkPassword = await validatePassword(req);
        const loggedInUser = req.user;

        if(!loggedInUser){
            throw new Error("User not found");
        }

        if(!checkPassword){
            throw new Error("Current password is incorrect");
        }

        const newPassword = req.body["newPassword"];

        loggedInUser["password"] = await bcrypt.hash(newPassword,10);
        await loggedInUser.save();

        res.send("Password updated successfully");




 })

 module.exports = profileRouter;

