import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import authController from '../controllers/authController';
import placeController from '../controllers/placeController';
import { catchErrors } from '../handlers/errorHandlers';
import schema from '../data/schema';

const router = express.Router();

router.get('/api/places', authController.apiAuth, catchErrors(placeController.getPlaces));

// graphQl endpoint
router.use('/api/graphql', authController.apiAuth, graphqlExpress({ schema }));
router.use(
  '/api/graphiql',
  authController.apiAuth,
  graphiqlExpress({ endpointURL: '/api/graphql' }),
);

module.exports = router;
