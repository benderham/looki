const Place = require('../models/Place');

exports.getPlaces = async (req, res) => {
  const places = await Place.find();
  res.send(places);
};
