'use strict'
require('dotenv').config();
const superagent = require('superagent');
const errorhandler = require('./errorhamdler')



function trailsHandler(req, res) {
    // let lon = req.params.longitude
    // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    superagent(`https://www.hikingproject.com/data/get-trails?lat=${req.query.latitude}&lon=${req.query.longitude}&maxDistance=500&key=${process.env.TRAIL_API_KEY}`)
        .then((trailsApiResponse) => {
            // console.log(trailsApiResponse);
            //get the data from the api
            const trailsData = trailsApiResponse.body.trails.map((data) => {
                return new Trails(data);
            })
            res.status(200).json(trailsData);
        })
        .catch(error => { errorhandler(req, res, error) })
}

function Trails(data) {
    this.name = data.name;
    this.location = data.location;
    this.length = data.length;
    this.stars = data.stars;
    this.star_votes = data.starVotes;
    this.summary = data.summary;
    this.trail_url = data.url;
    this.conditions = data.conditionDetails;
    this.condition_date = new Date(data.conditionDate).toLocaleDateString();
    this.condition_time = new Date(data.conditionDate).toLocaleTimeString();
}

module.exports = trailsHandler;