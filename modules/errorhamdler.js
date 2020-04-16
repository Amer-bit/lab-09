'use strict'

function errorhandler(req, res, error) {

    res.status(500).json(error);
};

module.exports = errorhandler;