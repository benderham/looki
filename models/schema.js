import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import { typeDef as Place, resolvers as placeResolvers } from './Place';

const Query = `
  type Query {
    _empty: String
  }
`;

const resolvers = {};

const schema = makeExecutableSchema({
  typeDefs: [Query, Place],
  resolvers: merge(resolvers, placeResolvers),
});

export default schema;
