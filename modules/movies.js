'use strict'

require('dotenv').config();
const superagent = require('superagent');
const errorhandler = require('./errorhamdler');


function movieHandler(req, res) {
    // console.log(req.query);
    superagent(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&query=${req.query.search_query}&page=1`)

        .then(movieApiDataResponse => {
            // console.log(movieApiDataResponse);
            let movieData = movieApiDataResponse.body.results.map(value =>{
                const movieObj = new Movie (value);
                return movieObj
            });
            res.status(200).json(movieData)
        }).catch( error =>{ errorhandler(req, res, error)})
}

function Movie(movieData){
    this.title = movieData.title;
    this.overview = movieData.overview;
    this.average_votes = movieData.vote_average;
    this.total_votes = movieData.vote_count;
    this.img_url = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
    this.popularity = movieData.popularity;
    this.released_on = movieData.release_date;
}

module.exports = movieHandler