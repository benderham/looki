import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
// import mocks from '../mocks/Place';

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
// addMockFunctionsToSchema({ schema, mocks });

export default schema;

// models >> model >> schema, resolver, connector
// >> schema.js, resolver.js, connector.js
