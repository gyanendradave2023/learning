const mongoose = require("mongoose");
const dbUrl = `mongodb+srv://gyanendradave2023:ZjQStut5cdMdfJmx@cluster0.sjipppy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to db");
    } catch(err) {
        console.log(err);
    }
};

module.exports = connectDB;