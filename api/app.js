var express = require('express');
var app = express();
require('dotenv').load();

var characterRoutes = require('./routes/characters');
app.use('/characters', characterRoutes)

module.exports = app;
