const express = require('express');
const app = express();
require('dotenv').load();

// Routes
app.use('/characters', require('./routes/characters'));
app.use('/comics', require('./routes/comics'));

module.exports = app;
