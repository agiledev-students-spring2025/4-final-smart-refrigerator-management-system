require('dotenv').config()

const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB = async () => {
    try {
      await mongoose.connect(uri, clientOptions);
    } catch (err) {
      process.exit(1);
    }
  };

module.exports = connectDB;
