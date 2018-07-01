const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const apiUserSchema = new mongoose.Schema();

module.exports = mongoose.model('ApiUser', apiUserSchema);
