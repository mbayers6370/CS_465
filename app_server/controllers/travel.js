const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

const renderUnavailable = (res, status, message) => res.status(status).render('travel-detail', {
  title: 'Travel - Travlr Getaways',
  trip: null,
  message
});

/* GET travel view */
const travel = async (req, res) => {
  try {
    const response = await fetch(tripsEndpoint, options);

    if (!response.ok) {
      return res.status(response.status).render('travel', {
        title: 'Travel - Travlr Getaways',
        trips: [],
        message: `Unable to retrieve trips from the API. Status: ${response.status}`
      });
    }

    const trips = await response.json();

    if (!Array.isArray(trips)) {
      return res.status(500).render('travel', {
        title: 'Travel - Travlr Getaways',
        trips: [],
        message: 'The trips API returned an unexpected response.'
      });
    }

    if (trips.length === 0) {
      return res.status(404).render('travel', {
        title: 'Travel - Travlr Getaways',
        trips: [],
        message: 'No trips are currently available.'
      });
    }

    res.render('travel', {
      title: 'Travel - Travlr Getaways',
      trips
    });
  } catch (err) {
    console.log(`Travel API request failed: ${err}`);
    res.status(502).render('travel', {
      title: 'Travel - Travlr Getaways',
      trips: [],
      message: 'Trips are temporarily unavailable.'
    });
  }
};

/* GET travel detail view */
const travelDetails = async (req, res) => {
  try {
    const response = await fetch(`${tripsEndpoint}/${req.params.tripCode}`, options);

    if (!response.ok) {
      return renderUnavailable(
        res,
        response.status,
        `Unable to retrieve this trip from the API. Status: ${response.status}`
      );
    }

    const trip = await response.json();

    if (!trip || Array.isArray(trip) || typeof trip !== 'object') {
      return renderUnavailable(res, 500, 'The trips API returned an unexpected response.');
    }

    trip.startDate = new Date(trip.start).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    res.render('travel-detail', {
      title: `${trip.name} - Travlr Getaways`,
      trip
    });
  } catch (err) {
    console.log(`Travel detail API request failed: ${err}`);
    renderUnavailable(res, 502, 'This trip is temporarily unavailable.');
  }
};

module.exports = {
  travel,
  travelDetails
};
