const express = require('express');

const configureMiddleware = require('./config/middleware.js');
const projectRoutes = require('./projects/projectRoutes');
const actionRoutes = require('./actions/actionRoutes');

const server = express();
const port = 9000;

configureMiddleware(server);

server.use('/projects', projectRoutes);
server.use('/actions', actionRoutes);

function runServer() {
    console.log('\x1b[34m', `\n[server] started server`);
    console.log(`[server] running on port: ${port}\n`)
    console.log('\x1b[0m', '');
}

server.listen(port, runServer());