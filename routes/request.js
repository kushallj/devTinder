const express = require('express');
const requestRouter = express.Router();
const {adminAuth} = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/userSchema');


requestRouter.post('/request/:status/:toUserId',adminAuth, async (req,res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored","interested"];

        if(!allowedStatus.includes(status)){
            res.status(400).json(message="Invalid status type: "+ status);
        }

        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message: 'User not found!'});
        }

        const existingCOnnectionRequest = await ConnectionRequest.findOne(
            {$or:[{
            fromUserId,toUserId},
            {fromUserId: toUserId, toUserId: fromUserId}]});

        if(existingCOnnectionRequest){
            return res.status(400).json({message: 'Connection Request already exists'});
        }



        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        res.json({message: req.user.firstName+" is "+status+ " in "+toUser.firstName,data});
        
    }
    catch (err){
        res.status(400).send("Error :"+err.message);
        console.log(err.message);
    }
});

module.exports = requestRouter;