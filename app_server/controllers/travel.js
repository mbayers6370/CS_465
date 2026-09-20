const fs = require('fs');
const path = require('path');

const trips = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../data/trips.json'), 'utf8')
);

/* GET travel view */
const travel = (req, res) => {
  res.render('travel', { title: 'Travlr Getaways', trips });
};

module.exports = {
  travel
};
