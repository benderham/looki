import mongoose from 'mongoose';

/**
 * MongoDB Schema
 */
mongoose.Promise = global.Promise;
const placeSchema = new mongoose.Schema({
  name: String,
  text: String,
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
    name: String
    text: String
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
