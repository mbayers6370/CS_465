const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

require('../app_api/models/db');
const Trip = require('../app_api/models/travlr');

const trips = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/trips.json'), 'utf8')
);

const seedTrips = async () => {
  await mongoose.connection.asPromise();
  await Trip.deleteMany({});
  await Trip.insertMany(trips);
  console.log(`Seeded ${trips.length} trips`);
  await mongoose.connection.close();
};

seedTrips().catch(async err => {
  console.error(err);
  await mongoose.connection.close();
  process.exit(1);
});
