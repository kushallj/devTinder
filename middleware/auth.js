const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const adminAuth = async (req,res,next)=>{
    try
    {const {token} = req.cookies;
    if(!token){
        throw new Error("token is not valid!!!!!!!!!!!!");
    }

    const decodeObj = await jwt.verify(token, "DEV@Tinder",{expiresIn: "7d"});

    const {_id} = decodeObj;

    const user = await User.findById(_id);

    if(!user){
        throw new Error("user is not found");
    }

        req.user = user;
        next();} catch(err){
        res.status(400).send("Error : "+ err.message);
        }
    
}

module.exports = {
    adminAuth
}