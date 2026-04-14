const mongoose = require("mongoose")

const connectDB = async() => {
    try{
       await mongoose.connect(process.env.MONGO_URI);
       console.log("MOngoDB connected");
    }
    catch(e){
        console.log("Database Connection error",e.message)
        process.exit(1);

    }
};

module.exports = connectDB;
