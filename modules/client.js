'use strict'

require('dotenv').config();
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL) // pg is constructor function which have client method
client.on('error', error => { throw new Error(error) });

module.exports = client;