import Place from '../models/Place';

const resolvers = {
  Query: {
    place: async (root, args) => {
      const place = await Place.findOne({ name: args.name });
      return place;
    },
    allPlaces: async () => {
      const places = await Place.find();
      return places;
    },
  },
};

export default resolvers;
