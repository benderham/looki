const express = require('express');

const router = express.Router();
const placeController = require('./../controllers/placeController');
const { catchErrors } = require('./../handlers/errorHandlers');

router.get('/', catchErrors(placeController.getPlaces));

module.exports = router;
