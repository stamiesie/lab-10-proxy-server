/* eslint-disable */

const { formatLocationData, formatWeatherData, formatReviewData } = require('../lib/mungeUtils.js');

require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    // let token;

    // beforeAll(async done => {
    //   execSync('npm run setup-db');

    //   client.connect();

    //   const signInData = await fakeRequest(app)
    //     .post('/auth/signup')
    //     .send({
    //       email: 'jon@user.com',
    //       password: '1234'
    //     });

    //   token = signInData.body.token; // eslint-disable-line

    //   return done();
    // });

    // afterAll(done => {
    //   return client.end(done);
    // });

    test('returns formatted location data', async () => {

      const testCity = [
        {
          "place_id": "282983083",
          "licence": "https://locationiq.com/attribution",
          "osm_type": "relation",
          "osm_id": "186579",
          "boundingbox": [
            "45.432536",
            "45.6528812",
            "-122.8367489",
            "-122.4720252"
          ],
          "lat": "45.5202471",
          "lon": "-122.6741949",
          "display_name": "Portland, Multnomah County, Oregon, USA",
          "class": "place",
          "type": "city",
          "importance": 0.75356571743377,
          "icon": "https://locationiq.org/static/images/mapicons/poi_place_city.p.20.png"
        }
      ];

      const expectation = {
        formatted_query: "Portland, Multnomah County, Oregon, USA",
        latitude: "45.5202471",
        longitude: "-122.6741949",
      };

      const result = formatLocationData(testCity);

      expect(result).toEqual(expectation);
    });

    test('returns formatted weather data', async () => {

      const testWeather = {
        "data": [
          {
            "moonrise_ts": 1588728093,
            "wind_cdir": "SW",
            "rh": 75,
            "pres": 899.112,
            "high_temp": 15.6,
            "sunset_ts": 1588735301,
            "ozone": 336.647,
            "moon_phase": 0.986614,
            "wind_gust_spd": 9.6,
            "snow_depth": 0,
            "clouds": 27,
            "ts": 1588662060,
            "sunrise_ts": 1588683144,
            "app_min_temp": 3.4,
            "wind_spd": 2.52495,
            "pop": 65,
            "wind_cdir_full": "southwest",
            "slp": 1018.93,
            "moon_phase_lunation": 0.44,
            "valid_date": "2020-05-05",
            "app_max_temp": 15.6,
            "vis": 23.2905,
            "dewpt": 6.5,
            "snow": 0,
            "uv": 7.86581,
            "weather": {
              "icon": "c02d",
              "code": 802,
              "description": "Scattered clouds"
            },
            "wind_dir": 218,
            "max_dhi": null,
            "clouds_hi": 0,
            "precip": 2.0625,
            "low_temp": 1.2,
            "max_temp": 15.7,
            "moonset_ts": 1588682768,
            "datetime": "2020-05-05",
            "temp": 11,
            "min_temp": 6.7,
            "clouds_mid": 4,
            "clouds_low": 27
          }
        ]
      };

      const expectation = [
        {
          forecast: "Scattered clouds",
          time: "Tue May 05 2020",
        }
      ];

      const result = formatWeatherData(testWeather);

      expect(result).toEqual(expectation);
    });

    test('returns formatted yelp review data', async () => {

      const testReview = {
        "businesses": [
          {
            "id": "4Hc4QRv8PBlTXi9jm2s5cw",
            "alias": "salt-and-straw-portland-4",
            "name": "Salt & Straw",
            "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/tlm_JobdYI6EQoaMGumUYA/o.jpg",
            "is_closed": false,
            "url": "https://www.yelp.com/biz/salt-and-straw-portland-4?adjust_creative=ArEEarMg8TZTKjO0IqLESw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ArEEarMg8TZTKjO0IqLESw",
            "review_count": 1404,
            "categories": [
              {
                "alias": "icecream",
                "title": "Ice Cream & Frozen Yogurt"
              }
            ],
            "rating": 4.5,
            "coordinates": {
              "latitude": 45.5049914,
              "longitude": -122.630574650262
            },
            "transactions": [],
            "price": "$",
            "location": {
              "address1": "3345 SE Division St",
              "address2": "",
              "address3": "",
              "city": "Portland",
              "zip_code": "97202",
              "country": "US",
              "state": "OR",
              "display_address": [
                "3345 SE Division St",
                "Portland, OR 97202"
              ]
            },
            "phone": "+15032082054",
            "display_phone": "(503) 208-2054",
            "distance": 2446.5905269024556
          },
        ]
      };

      const expectation = [
        {
          name: "Salt & Straw",
          image_url: "https://s3-media4.fl.yelpcdn.com/bphoto/tlm_JobdYI6EQoaMGumUYA/o.jpg",
          price: "$",
          rating: 4.5,
          url: "https://www.yelp.com/biz/salt-and-straw-portland-4?adjust_creative=ArEEarMg8TZTKjO0IqLESw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ArEEarMg8TZTKjO0IqLESw",
        }
      ];

      const result = formatReviewData(testReview);

      expect(result).toEqual(expectation);
    });
  });
});
