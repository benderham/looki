const express = require('express');

const router = express.Router();
const authController = require('./../controllers/authController');
const placeController = require('./../controllers/placeController');
const { catchErrors } = require('./../handlers/errorHandlers');

router.get('/api/places', authController.apiAuth, catchErrors(placeController.getPlaces));

module.exports = router;
