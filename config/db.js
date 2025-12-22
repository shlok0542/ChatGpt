const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected successfully ${mongoose.connection.host}`.cyan.bold);
    } catch (error) {
        console.log(`Error: ${error}`.red.bold);
    }
}
module.exports = connectDB;