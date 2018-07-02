import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
  type Place {
    id: String
    name: String
    text: String
  }

  type Query {
    place(name: String): Place
    allPlaces: [Place]
  }

  schema {
    query: Query
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;

// models >> model >> schema, resolver, connector
// >> schema.js, resolver.js, connector.js
