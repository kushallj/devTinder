const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName : {type: String,
        required: true,
    },
    lastName : {type: String,
        required: true,
    },
    emailId : {type: String,
        // required: true,
        unique:true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("enter a valid email address");
            }
        }
    },
    password : {type: String, 
        required: true
    },
    
    age : {type: Number,
        min:18,
    },
    gender : {type: String,
        enum: {
            values : ["male","female","other"],
            message: `{VALUE} is not a valid gender type`,
        },
    },
    photoUrl:{type:String,
        default: "https://pinnacle.works/dummy-image/"
    },
    about:{type:String},
    skills:{type:[String]},

},
{
    timestamps : true,
});

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id:user._id},"DEV@Tinder",{expiresIn:"7d"});
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);    

    return isPasswordValid;
}

module.exports = mongoose.model("User",userSchema);