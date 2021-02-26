const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');

// SIMULATED API CALL WITH DUMMY DATA
const geoJson = require('./geojsonData.js');
const weatherData = require('./weatherData.js');

// MUNGING FUNCTIONS
const { formatLocationData, formatWeatherData } = require('./mungeUtils.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging


// GEOCODING
app.get('/location', async (req, res) => {
  try {
    const formattedResponse = formatLocationData(geoJson);

    res.json(formattedResponse);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

// WEATHER
app.get('/weather', async (req, res) => {
  try {

    const formattedResponse = formatWeatherData(weatherData);

    res.json(formattedResponse);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
