const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

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

module.exports = {
  travel
};
