'use strict'
require('dotenv').config();
const superagent = require('superagent');
const errorhandler = require ('./errorhamdler')

function weatherHandler(req, res) {
    const city = req.query.search_query;
    superagent(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&maxDistance=500&key=${process.env.WEATHER_API_KEY}`)
        .then((apiResponse) => {

            let weatherData = apiResponse.body.data.map((value) => {
                return new Weather(value);
            })
            res.status(200).json(weatherData);
        })
        .catch(error => { errorhandler(req, res, error) })
}

function Weather(value) {
    this.forecast = value.weather.description;
    this.time = new Date(value.datetime).toDateString();
}

module.exports  = weatherHandler;