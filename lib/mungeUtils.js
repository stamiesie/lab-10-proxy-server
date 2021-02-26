
/* eslint-disable */

// LOCATION
function formatLocationData(dataArr) {
    // Takes in data array, returns formatted data to front end spec
    return {
        formatted_query: dataArr[0].display_name,
        latitude: dataArr[0].lat,
        longitude: dataArr[0].lon,
    };
}

// WEATHER
function formatWeatherData(weatherObj) {
    // Takes in weather object, maps over 'data' array to return weatherItem
    const result = weatherObj.data.map(weatherItem => {
        return {
            forecast: weatherItem.weather.description,
            // convert time stamp (ts) from seconds to milliseconds to create actual date, then make the date a string
            time: new Date(weatherItem.ts * 1000).toDateString(),
        };
    });
    // use slice to return only the next 5 days of forecast data array
    const formattedResponse = result.slice(0, 5);
    return formattedResponse;
}

// REVIEWS
function formatReviewData(locationObj) {
    // takes in object, maps over 'businesses' array of objects and returns values from keys
    const reviews = locationObj.businesses.map(item => {
        return {
            name: item.name,
            image_url: item.image_url,
            price: item.price,
            rating: item.rating,
            url: item.url,
        };
    });
    // use slice to return 5 reviews
    const formattedReviews = reviews.slice(0, 5);
    return formattedReviews;
}

module.exports = {
    formatLocationData,
    formatWeatherData,
    formatReviewData
};


