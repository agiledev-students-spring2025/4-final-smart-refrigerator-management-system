const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  name: { type: String, required: true },
  phone: { type: String, default: "000-000-0000" },
  fridgeModel:{
    fridgeBrand: {type: String, default: "Samsung"},
    modelName: {type: String, default: "S29"},
    Features: {
      humidity: {type: Boolean, default: false},
      freezerCompartment: {type: Boolean, default:true},
      vegetableDrawer: {type: Boolean, default:false},
      iceMaker: {type: Boolean, default:false},
      touchscreenPanel: {type: Boolean, default:false}
    }
  },
  dietary:{
    dietType: {type:String, default: ""},
    nutritionGoals:{type:String, default: ""},
    allergies:{type:Array}
  }

});

module.exports = mongoose.model('User', userSchema);
