const fs = require('fs');
const path = require('path');

const trips = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../data/trips.json'), 'utf8')
);
const Trip = require('../models/travlr');

/* GET travel view */
const travel = async (req, res) => {
  try {
    const dbTrips = await Trip.find({}).sort({ start: 1 }).lean();
    res.render('travel', {
      title: 'Travel - Travlr Getaways',
      trips: dbTrips.length ? dbTrips : trips
    });
  } catch (err) {
    console.log(`Travel lookup failed, falling back to seed data: ${err}`);
    res.render('travel', { title: 'Travel - Travlr Getaways', trips });
  }
};

module.exports = {
  travel
};
