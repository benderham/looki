import mongoose from 'mongoose';
import { isEmail } from 'validator';

/**
 * MongoDB Schema
 */
mongoose.Promise = global.Promise;
const placeSchema = new mongoose.Schema({
  name: { type: String, required: 'Name is required!' },
  location: { type: String, required: false },
  email: {
    type: String,
    required: 'Email Address is required!',
    validate: { validator: isEmail, message: 'A valid Email Address is required!' },
  },
  phone: { type: String, required: false },
  url: { type: String, required: false },
  description: { type: String, required: false },
  image: { type: String },
  category: { type: String, required: false },
  tags: [String],
  likes: Number,
  updated: { type: Date, default: Date.now },
});
export const Place = mongoose.model('Place', placeSchema);

/**
 * GraphQl Schema
 */
export const typeDef = `
  extend type Query {
    byName(name: String): Place
    allPlaces: [Place]
  }

  type Place {
    id: String
    name: String!
    location: String
    email: String
    phone: String
    url: String
    description: String
    image: String
    category: String
    tags: [String]
    likes: Int
    updated: String
  }
`;

/**
 * GraphQl Resolver
 */
export const resolvers = {
  Query: {
    byName: async (root, args) => {
      const place = await Place.findOne({ name: args.name });
      return place;
    },
    allPlaces: async () => {
      const places = await Place.find();
      return places;
    },
  },
};
