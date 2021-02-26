
/* eslint-disable */

// Takes in data array, returns formatted data to front end spec
function formatLocationData(dataArr) {
    return {
        formatted_query: dataArr[0].display_name,
        latitude: dataArr[0].lat,
        longitude: dataArr[0].lon,
    };
}

// Takes in weather object, maps over 'data' array to return weatherItem
function formatWeatherData(weatherObj) {
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

module.exports = {
    formatLocationData,
    formatWeatherData
};


