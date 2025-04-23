const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  category: {type: String, required: true, enum: ['dairy', 'meat', 'vegetables', 'fruits', 'beverages', 'leftovers', 'condiments', 'other'], default: 'other'},
  quantity: {type: String, required: true},
  expirationDate: {type: Date, required: true},
  purchaseDate: {type: Date, default: Date.now},
  storageLocation: {type: String, enum: ['main', 'door', 'freezer', 'crisper', 'deli drawer', 'other'], default: 'main'},
  frequency: {type: String, enum: ['daily', 'weekly', 'monthly', 'rarely', null], default: null},
  isStarterItem: {type: Boolean, default: false},
  nonExpiring: {type: Boolean,default: false},
  expiresIn: {type: String, default: null},
  purchaseCount: {type: Number, default: 0},
  notes: {type: String, trim: true},
  imageUrl: {type: String},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
  isStarterItem: {type: Boolean, default: false}
}, {timestamps: true});

ItemSchema.virtual('isExpired').get(function() {
  return this.expirationDate < new Date();
});

ItemSchema.virtual('daysUntilExpiration').get(function() {
  const today = new Date();
  const expiration = new Date(this.expirationDate);
  const diffTime = expiration - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

ItemSchema.set('toJSON', { virtuals: true });
ItemSchema.set('toObject', { virtuals: true });

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;