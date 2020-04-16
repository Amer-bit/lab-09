'use strict'

////////////////Load enviroment variables

///////////////using app dependancies
const express = require('express');
const cors = require('cors');
///////////////initilizing the server///////////////
const app = express();
const client = require('./modules/client')
////////////////////giving permission to connect to the server//////////////////////////
app.use(cors());
///////////////////////////////////////////////////////////
const PORT = process.env.PORT || 4000;
//////////////Connect to PSQL using the provided link in .env/////////////////////
const LocationHandler = require('./modules/location.js')
const weatherHandler = require('./modules/weather')
const trailsHandler = require ('./modules/Trials')
const movieHandler = require('./modules/movies')
const yelpHandler = require('./modules/yelp')
///////////////////////////Route Definition////////////////////////////////////////////

app.get('/', (req, res) => { res.status(200).json('Home Page') });
app.get('/location', LocationHandler);
app.get('/weather', weatherHandler);
app.get('/trails', trailsHandler);
app.get('/movies', movieHandler);
app.get('/yelp', yelpHandler)

//////////////////Routes Handlers/////////////////////

///////////////////////////////////////Constructors/////////////////////////////////

client
    .connect()
    .then(() => {
        app.listen(PORT, () =>
            console.log(`my server is up and running on port ${PORT}`)
        );
    })
    .catch((err) => {
        throw new Error(`startup error ${err}`);
    });