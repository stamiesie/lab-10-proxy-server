const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
// SIMULATED API CALL WITH STUBBED OUT DATA
const geoJson = require('./geojsonData.js');
const weatherData = require('./weatherData.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging


// GEOCODING
app.get('/location', async (req, res) => {
  try {

    res.json({
      formatted_query: "Seattle, WA, USA",
      latitude: "47.606210",
      longitude: "-122.332071"
    });

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

// WEATHER
app.get('/weather', async (req, res) => {
  try {

    res.json([
      {
        "forecast": "Partly cloudy until afternoon.",
        "time": "Mon Jan 01 2001"
      },
      {
        "forecast": "Mostly cloudy in the morning.",
        "time": "Tue Jan 02 2001"
      },
    ]);

  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
