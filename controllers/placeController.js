const Place = require('../models/Place');

exports.getPlaces = async (req, res) => {
  const places = await Place.find();
  console.log(places);
  res.send(places);
};
