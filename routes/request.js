const express = require('express');
const requestRouter = express.Router();
const {adminAuth} = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/userSchema');
const { Connection } = require('mongoose');


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

requestRouter.post('/request/:status/:requestId',adminAuth, async (req,res) => {
    try{
        const loogedInUser = req.user;

        const allowedStatus = ["accepted","rejected"];

        const status = req.params.status;

        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Status type is not allowed: "+status});
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: req.params.requestId,
            toUserId: loogedInUser._id,
            status: "interested"
        });
        if(!connectionRequest){
            return res
                  .status(404)
                  .json({message: 'Connection Request not found or already processed!'

                  });
                }
        connectionRequest.status = status;
        const data =await connectionRequest.save();

        return res.json({
            message: `Connection Request ${status} successfully`,
            data
     })
    } catch (err){
        res.status(400).send("Error :"+err.message);
        console.log(err.message);
    }
})

module.exports = requestRouter;