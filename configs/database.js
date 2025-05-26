const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://youtube:nCXpaoeONT9aDsGY@devtinder.8enssua.mongodb.net/");
};


module.exports = connectDB;

