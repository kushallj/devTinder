const express = require('express');
const requestRouter = express.Router();


requestRouter.get('/sentConnectionRequest', (req,res) => {
    try{
        const user = req.user;
        console.log("sending connection request");
    }
    catch (err){
        res.status(400).send("Error :"+err.message);
        console.log(err.message);
    }
});

module.exports = requestRouter;