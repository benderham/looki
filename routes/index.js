import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from '../data/schema';

const express = require('express');

const router = express.Router();
const authController = require('./../controllers/authController');
const placeController = require('./../controllers/placeController');
const { catchErrors } = require('./../handlers/errorHandlers');

router.get('/api/places', authController.apiAuth, catchErrors(placeController.getPlaces));

router.use('/api/graphql', authController.apiAuth, graphqlExpress({ schema }));
router.use(
  '/api/graphiql',
  authController.apiAuth,
  graphiqlExpress({ endpointURL: '/api/graphql' }),
);

module.exports = router;
