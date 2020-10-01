/**
 * Simple express sever
 * Copyright (c) 2014, marlun78
 * MIT License, https://gist.github.com/marlun78/bd0800cf5e8053ba9f83
 * 
 * Assumes this folder structure
 * /public
 * /server
 * 
 * Express: http://expressjs.com
 */
var app, server,
    express = require('express'),
    path = require('path'),
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000,
    root = path.resolve(__dirname, '..');
 
app = express();
app.use(function(req, res, next) { console.log(req.url); next(); });
app.use(express.static(root + '/dist'));
server = app.listen(port, host, serverStarted);
 
function serverStarted () {
    console.log('Server started', host, port);
    console.log('Root directory', root);
    console.log('Press Ctrl+C to exit...\n');
}