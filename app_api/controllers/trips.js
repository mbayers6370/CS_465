const Trip = require('../models/travlr');

const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).sort({ start: 1 }).lean();

    if (!Array.isArray(trips) || trips.length === 0) {
      return res.status(404).json({ message: 'No trips found' });
    }

    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ message: 'Database error retrieving trips' });
  }
};

const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.tripCode }).lean();

    if (!trip) {
      return res.status(404).json({ message: `Trip code ${req.params.tripCode} not found` });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({ message: 'Database error retrieving trip' });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};
