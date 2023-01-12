const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  items: { type: Array, required: true },
  user: { type: String, required: true, ref: 'User' },
});

module.exports = mongoose.model('List', listSchema);
