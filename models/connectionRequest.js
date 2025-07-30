const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to User model
        required: true,

    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    status: {
        type: String,
        enum: {
            values : ["ignored", "interested","accepted","rejected"],
            message: `{VALUE} is incorrect status type`,
        }
    }
},
{
    timestamps: true
});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 },);

connectionRequestSchema.pre('save', function(next) {
    const connectionRequest = this; //middleware called whenever we save a connection request
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error('fromUserId and toUserId cannot be the same');
    }
    next();
  });

const ConnectionRequest = mongoose.model('ConnectionRequest',connectionRequestSchema);
module.exports = ConnectionRequest;