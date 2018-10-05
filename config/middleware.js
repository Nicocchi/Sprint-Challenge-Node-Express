const express = require('express');
const logger = require('morgan');

module.exports = server => {
    server.use(logger('combined'), express.json());
};