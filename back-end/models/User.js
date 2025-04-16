const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  name: { type: String, required: true },
  phone: { type: String, default: "000-000-0000" },
  fridgeModel:{
    fridgeBrand: {type: String, default: "Samsung"},
    ModelName: {type: String, default: ""}
    
  }
});

module.exports = mongoose.model('User', userSchema);
