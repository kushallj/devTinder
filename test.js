require("dotenv").config();
const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URL;
const client = new MongoClient(url);

async function testConnection() {
    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        console.log("Connected to MongoDB successfully!");
    } catch (err) {
        console.error("Connection error:", err.message);
    } finally {
        await client.close();
        console.log("Connection closed.");
    }
}

testConnection();

// console.log("Hello, World!");
