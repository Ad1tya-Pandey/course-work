// src/mongoConnection.js
const mongoose = require('mongoose');
const Football = require('./models');

mongoose.connect('mongodb+srv://aditya:4321@Aditya@cluster0.0kgsv.mongodb.net/footballStats', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = Football;
