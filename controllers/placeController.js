import { sanitizeBody } from 'express-validator/filter';
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

exports.sanitizePlace = [
  sanitizeBody('name')
    .escape()
    .trim(),
  sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  }),
];

exports.createPlace = async (req, res) => {
  const place = await new Place(req.body).save();
  req.flash('success', `Successfully Created ${place.name}.`);
  res.redirect('/admin/places');
};
