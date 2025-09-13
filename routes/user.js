const express = require('express');
const {adminAuth} = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const userRouter = express.Router();
const User = require('../models/userSchema');

const USER_SAFE_DATA = 'firstName lastName photoUrl age gender about skills';


userRouter.get('/user/request/received',adminAuth,async (req,res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate('fromUserId', 'firstName lastName photoUrl age gender about skills');

        res.json({
            message: "Received connection requests",
            data: connectionRequests
        });
    } catch(err){
        res.status(400).send("Error :"+err.message);
        console.log(err.message);
    }
});

userRouter.get('/user/connections',adminAuth, async (req,res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1)*limit;

        limit = limit > 50 ? 50 : limit;

        const connectionRequest = ConnectionRequest.find({
            $or:[
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"},
            ],
        }).populate("fromUserId", USER_SAFE_DATA)
          .populate("toUserId",USER_SAFE_DATA)
          
          console.log(connectionRequest);

          const data = (await connectionRequest).map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
          })

          res.json({message: "Received connection requests",data: data});
    } catch (error) {
        res.status(400).send(error.message);
    }
});

userRouter.get('/feed',adminAuth, async (req,res) => {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
        $or: [
            {fromUserId: loggedInUser._id, toUserId: loggedInUser._id}
        ]
    }).select("fromUserId toUserId")

    const hideUserFromFeed = new Set();

    connectionRequest.forEach(request=> 
      {
        hideUserFromFeed.add(request.fromUserId.toString());
        hideUserFromFeed.add(request.toUserId.toString());

      }
    );
    console.log(hideUserFromFeed);

    const users = await User.find({
        $and:[{
            _id:{$nin: Array.from(hideUserFromFeed)},
            _id:{$ne:loggedInUser._id}
        }
        ],
    }).select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit)

    res.json({data: users});
})

module.exports = userRouter;