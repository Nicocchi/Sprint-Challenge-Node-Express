const express = require('express');
const logger = require('morgan');
const cors = require('cors');

module.exports = server => {
    server.use(logger('combined'), express.json(), cors());
};