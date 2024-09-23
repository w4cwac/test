const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

exports.DbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDb Connected');
    } catch ( error ) {
        console.log(error);
        throw error;
    }
}