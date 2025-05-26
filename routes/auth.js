const express = require('express');
const authRouter = express.Router();
const validateFields = require("../utils/validate");
const User = require("../models/userSchema");
const bcrypt = require('bcrypt');

authRouter.post("/signup",async (req,res)=>{
    console.log(req.body);
    const userObj =await new User(req.body);

    const {firstName, lastName, emailId, password} = userObj;


    validateFields(req);
    if(userObj?.skills.length>10){
        throw new Error("you cannot add more than 10 skills");

    }

    const passwordHash = await bcrypt.hash(password, 10);

        // Create user AFTER password hashing
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,  // Store hashed password
        });

        // Save user in database
        await user.save();

        
    res.send("data saved successfully");
});

authRouter.post("/login",async (req,res)=>{
    try{const {emailId, password} = req.body;

    const user = await User.findOne({emailId});
    if(!user){
        throw new Error("Invalid credenrials");
    }
    const isPasswordValid = await user.validatePassword(password);

    const token = await user.getJWT();

    

    if(isPasswordValid){
        res.cookie("token",token)
        res.send("Login Successfull!!!")
    } else {
        throw new Error("Invalid credenrials");
    }

} catch(err){
    res.status(400).send("Error : "+ err.message);
    console.log(err.message)
}

});

module.exports = authRouter;