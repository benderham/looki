import { Place } from '../models/Place';

exports.getPlaces = async (req, res) => {
  const places = await Place.find();
  res.json(places);
};

exports.adminPlaces = async (req, res) => {
  const places = await Place.find();
  res.render('places', { title: 'Places', places });
};

exports.addPlace = (req, res) => {
  res.render('editPlace', { title: 'Add Place' });
};

exports.createPlace = async (req, res) => {
  const place = await new Place(req.body).save();
  req.flash('success', `Successfully Created ${place.name}.`);
  res.redirect('/admin/places');
};
