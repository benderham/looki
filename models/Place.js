import mongoose from 'mongoose';

/**
 * MongoDB Schema
 */
mongoose.Promise = global.Promise;
const placeSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  images: [String],
  category: String,
  tags: [String],
  updated: { type: Date, default: Date.now },
});
export const Place = mongoose.model('Place', placeSchema);

// Name
// Address
// Category - not sure exactly but to help filter, like Pub, Park, etc
// Description
// Photos
// Features:
//  - wheelchair-accessible main
//  - wheelchair-accessible toilets
//  - hearing loop (probably has a proper name)
//  - parenting room? like for changing and/or nursing?

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
    description: String
    images: [String]
    category: String
    tags: [String]
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
