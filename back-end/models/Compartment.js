const mongoose = require('mongoose');

const CompartmentSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  type: {type: String, enum: ['main', 'door', 'freezer', 'crisper', 'deli drawer', 'other'], default: 'main'},
  description: {type: String, trim: true},
  temperature: {type: Number,},
  humidity: {type: Number,},
  idealFoodTypes: [{type: String, enum: ['dairy', 'meat', 'vegetables', 'fruits', 'beverages', 'leftovers', 'condiments', 'other']}],
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});

const Compartment = mongoose.model('Compartment', CompartmentSchema);

module.exports = Compartment;