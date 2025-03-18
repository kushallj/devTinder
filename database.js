const { MongoClient } = require("mongodb");

const url = "mongodb+srv://NamasteNode:mPrMK52pDFElQeUI@namasteguru.nb3f1.mongodb.net/";

const client = new MongoClient(url);

async function run() {
    console.log("Starting script...");
    try {
        console.log("Connecting to MongoDB...");
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("HelloWorld");
        const collection = db.collection("User");

        // const doc = {
        //     firstName: "deepti",
        //     lastName: "gandhi",
        //     city: "porbandar"
        //   }

        // const result = await collection.insertOne(doc);

        const filter = { firstName: "Kushall" };
    /* Set the upsert option to insert a document if no documents match
    the filter */
    const options = { upsert: true };
    // Specify the update to set a value for the plot field
    const updateDoc = {
      $set: {
        firstName: `king`
      },
    };

    const result = await collection.updateOne(filter, updateDoc, options);

        
        const documents = await collection.find({}).toArray();
        console.log("Found documents:", documents);

    } catch (error) {
        console.error("Error occurred during script execution:", error);
    } finally {
        console.log("Closing MongoDB client...");
        await client.close();
        console.log("Client closed.");
    }
}

run();
