const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const placeSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
});

module.exports = mongoose.model('Place', placeSchema);
