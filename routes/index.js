import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import express from 'express';
import authController from '../controllers/authController';
import placeController from '../controllers/placeController';
import { catchErrors } from '../handlers/errorHandlers';
import schema from '../models/schema';

const router = express.Router();

router.get('/admin/places', catchErrors(placeController.adminPlaces));
router.get('/admin/places/add', placeController.addPlace);
router.post('/admin/places/add', catchErrors(placeController.createPlace));

// API
// rest endpoints
router.get('/api/places', authController.apiAuth, catchErrors(placeController.getPlaces));

// graphQl endpoint
router.use('/api/graphql', authController.apiAuth, graphqlExpress({ schema }));
router.use(
  '/api/graphiql',
  authController.apiAuth,
  graphiqlExpress({ endpointURL: '/api/graphql' }),
);

module.exports = router;
