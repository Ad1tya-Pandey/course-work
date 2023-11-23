// src/db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://aditya:4321%40Aditya@cluster0.0kgsv.mongodb.net/footballStats', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
  db.once('open', async () => {
    try {
      // Create the 'footballData' collection
      await mongoose.connection.createCollection('footballData');
      console.log('Collection created!');
    } catch (error) {
      console.error('Error creating collection:', error);
    } finally {
      // Close the MongoDB connection when done
      mongoose.connection.close();
    }
  });

