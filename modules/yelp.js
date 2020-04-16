'use strict'

require('dotenv').config();
const errorhandler = require('./errorhamdler')
const superagent = require ('superagent');

function yelpHandler(req, res){
    superagent(`https://api.yelp.com/v3/businesses/search?location=${req.query.search_query}`)
    .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
    .then(yelpApiData =>{
        let yelpJsonData = yelpApiData.body.businesses;
        let createMyobj = yelpJsonData.map ( value => {
          return new Yelp(value);
        })
        res.status(200).json(createMyobj);
    }).catch( error =>{ errorhandler(req, res, error)})

}

function Yelp(yelpData) {
    this.name = yelpData.name;
    this.img_url = yelpData.image_url;
    this.price = yelpData.price;
    this.rating = yelpData.rating;
    this.url = yelpData.url;
}

module.exports = yelpHandler