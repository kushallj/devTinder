<<<<<<< HEAD
var express = require('express');

let app = express();

app.listen(7777,()=>{
    console.log("server is running on port 7777");
})

app.use('/test',(req,res)=>{
    res.send("testing the app");
});

app.use('/hello',(req,res)=>{
    res.send("hello my buddy");
});

=======
const express = require('express');

const {adminAuth} = require('./middleware/auth');

const connectDB = require('./configs/database');

const validator = require("validator");

const User = require("./models/userSchema");

const validateFields = require("./utils/validate");

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


const app = express();

const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.post("/signup",async (req,res)=>{
    // console.log(req.body);
    const userObj =new User (req.body);

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

app.post("/login",async (req,res)=>{
    try{const {emailId, password} = req.body;

    const user = await User.findOne({emailId});
    if(!user){
        throw new Error("Invalid credenrials");
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);

    const token = jwt.sign({_id:user._id},"DEV@Tinder")

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

app.get("/profile", async (req,res)=>{
   try{ const cookie = req.cookies;

    const {token} = cookie

    const decodedMessage  = await jwt.verify(token, "DEV@Tinder");

    const {_id} = decodedMessage;

    
    const user = await User.findById(_id)
    
    console.log("logged in user is "+user);

    res.send(user);} catch(err){
        res.status(400).send("Error : "+ err.message);
        console.log(err.message)
    }
})

app.get('/email',async (req,res)=>{
    
    const emailId = req.body.emailId;
    console.log(req.body);

    try {
        const user = await User.findOne({emailId: emailId});
        // console.log("Raw User Data:", user);
        // console.log("User data:", JSON.stringify(user, null, 2));
        const safeUser = JSON.parse(JSON.stringify(user)); // Removes circular refs


        if(!user){
            res.status(400).send("user not found")
        } 
            // res.json(user);
            res.json(safeUser);
        
    } catch (error) {
        res.status(400).send("user not found"+error.message)
    }
});

app.delete("/user",async (req,res)=>{
    const user = req.body.emailId;
    console.log(user);
    try {
        const usr = await User.deleteOne({emailId:user});
        res.send(usr);
    } catch (error) {
        res.status(400).send("user not found"+error.message)
    }
});



app.patch("/user/:userId", async (req,res)=>{
    const data = req.body;
    const userId = req.param?.userId;
    try {

        const ALLOWED_UPDATES = [firstName, lastName, skills, age];
        const isAllowedUpdates = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k));

        if(!isAllowedUpdates){
            throw new Error("only firstName, lastName, skills, age can be updated");
        }

        if(data?.skills.length>10){
            throw new Error("you cannot add more than 10 skills");

        }

        const user = await User.findByIdAndUpdate(userId,data,{returnDocument:'before',
            runValidators: true,
        });
        res.send(user);

    } catch (error) {
        res.status(400).send("user not found"+error.message)

    }
    
})



connectDB()
    .then(()=>{
        console.log("connection successfully established");
        app.listen(7777,()=>{
            console.log("app is up and running")
        })
    })
    .catch((err)=>{
        console.error("Databse cannot be connected!!"+err.message);
        });





app.get('/admin',adminAuth,(req,res,next)=>{
    res.send('in your service')
})

app.use('/user',(req,res,next)=>{
    console.log("handling the 1st route")
    next();
},
(req,res,next)=>{
    console.log("handling the 2nd route")
    next();
    res.send("2nd response")
},
(req,res,next)=>{
    console.log("handling the 3rd route")
    
    res.send("3rd response")
},
)
>>>>>>> 06e869c (app authentication , jwt, passowrd hashing)
