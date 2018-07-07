import { Place } from '../models/Place';

exports.getPlaces = async (req, res) => {
  const places = await Place.find();
  res.send(places);
};

exports.adminPlaces = async (req, res) => {
  const places = await Place.find();
  res.render('places', { title: 'Places', places });
};
