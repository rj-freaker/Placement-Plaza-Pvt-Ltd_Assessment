const mongoose = require("mongoose");

const connectToDb = async () => {
    try{
        const dbResponse = await mongoose.connect(`${process.env.MONGODB_URI}/signupdatabase`);
        console.log('Database connected successfully');
    }catch(err){
        console.log('Database connection error');
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectToDb;