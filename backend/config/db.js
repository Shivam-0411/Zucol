const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database Connected');
  } catch (err) {
    console.log("Error in connecting to Database");
    console.error(err);
    process.exit(1);
  }
};
module.exports = connectDB;