'use strict'


const client = require('./client')
const superagent = require('superagent');
const errorhandler = require('./errorhamdler')

function LocationHandler(req, res) {
    let cityName = req.query.city;

    let SQL = 'SELECT * FROM citylocation WHERE search_query=$1;'
    let safeValue = [cityName];

    client.query(SQL, safeValue)
        .then(result => {
            if (result.rowCount > 0) {

                res.status(200).json(result.rows[0])

            } else {

                superagent(`https://eu1.locationiq.com/v1/search.php?key=${process.env.Location_API_KEY}&q=${cityName}&format=json`)

                    .then((locationApiRes) => {

                        const locationDataFromApi = locationApiRes.body;
                        let reformingApiData = new Location(cityName, locationDataFromApi);

                        const SQL = 'INSERT INTO citylocation(search_query,searchcity,latitude,longitude) VALUES ($1,$2,$3,$4) RETURNING *;'
                        let objectValues = Object.values(reformingApiData);

                        client.query(SQL, objectValues)
                            .then(results => {

                                res.status(200).json(reformingApiData);
                            })
                            .catch(error => { errorhandler(req, res, error) })
                    })
            }
        })
}

function Location(city, locationDataFromApi) {
    this.search_query = city;
    this.formatted_query = locationDataFromApi[0].display_name;
    this.latitude = locationDataFromApi[0].lat;
    this.longitude = locationDataFromApi[0].lon;
}
module.exports = LocationHandler;