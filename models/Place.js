import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
const placeSchema = new mongoose.Schema({
  name: String,
  text: String,
});

export default mongoose.model('Place', placeSchema);
