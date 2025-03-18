const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://NamasteNode:LW1d7yXaKrUEaT1U@namasteguru.nb3f1.mongodb.net/devTinder");
};


module.exports = connectDB;

