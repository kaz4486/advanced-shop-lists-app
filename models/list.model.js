const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // user: { type: String, required: true, ref: 'User' },
  items: { type: Array, required: true },
  publicationDate: { type: String, required: true },
});

module.exports = mongoose.model('List', listSchema);
