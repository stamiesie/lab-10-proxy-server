const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');

// SIMULATED API CALL WITH DUMMY DATA
// const geoJson = require('./geojsonData.js');
// const weatherData = require('./weatherData.js');

// IMPORT MUNGING FUNCTIONS
const { formatLocationData, formatWeatherData, formatReviewData } = require('./mungeUtils.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging


// GEOCODING
app.get('/location', async (req, res) => {
  try {
    // 'search' is the URL param that is used with this API for the city search input
    const cityName = req.query.search;

    const locationData = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_IQ_API_KEY}&q=${cityName}&format=json`);
    // .body because using superagent
    const formattedResponse = formatLocationData(locationData.body);

    res.json(formattedResponse);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

// WEATHER
app.get('/weather', async (req, res) => {
  try {
    const lat = req.query.latitude;
    const lon = req.query.longitude;

    const weatherData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_BIT_API_KEY}`);

    const formattedResponse = formatWeatherData(weatherData.body);

    res.json(formattedResponse);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

// REVIEWS
app.get('/reviews', async (req, res) => {
  try {
    const lat = req.query.latitude;
    const lon = req.query.longitude;

    const yelpURL = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`;

    const reviewData = await request.get(yelpURL)
      .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`);

    const formattedReviews = formatReviewData(reviewData.body);

    res.json(formattedReviews);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
