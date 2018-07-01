import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import mocks from '../mocks/Place';

const typeDefs = `
  type Query {
    place(name: String): Place
    allPlaces: [Place]
  }

  type Place {
    id: Int
    name: String
    text: String
  }

  schema {
    query: Query
  }
`;

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema, mocks });

export default schema;
