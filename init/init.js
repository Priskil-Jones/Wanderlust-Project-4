require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data.js");              //Importing Array from data.js file to "initData"
const Listing = require("../models/listing.js");    //Importing Model from listing.js file

const MONGO_URL = process.env.ATLASDB_URL;

main()
.then(()=> {
    console.log("Connection successful from init/index.js");
})
.catch((err)=> {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}


const initDB = async ()=> {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({
        ...obj,
        owner: "6a71d12f8807b533471da8e9",
    }));
    await Listing.insertMany(initData.data);    //We passed "data" key from data.js.
    console.log("Data was initialized");
}

initDB();

// initData.data is Array of objects. 
// Map goes through each object one by one.
