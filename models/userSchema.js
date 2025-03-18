const mongoose = require('mongoose');
const validator = require('validator');

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
        validate(value){
            if(!['male','female','other'].includes(value)){
                throw new Error("gender data is not valid")
            }
        }
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

module.exports = mongoose.model("User",userSchema);