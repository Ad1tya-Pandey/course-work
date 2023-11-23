// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const Football = require('./models');
require('./db'); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Add your routes here...

// 1.5 Add Query in POST Method to Add Data
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hi!' });
    console.log('api');
  });

app.post('/', function(req, res) {
    res.send('Hello Sir')
})

  app.get
app.post('/api/football/add', async (req, res) => {
    try {
      const newData = new Football(req.body);
      await newData.save();
      res.json(newData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // 1.6 Write Query in POST Method for Updating a Single Record
  app.post('/api/football/update/:team', async (req, res) => {
    try {
      const updatedData = await Football.findOneAndUpdate(
        { team: req.params.team },
        req.body,
        { new: true }
      );
      res.json(updatedData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // 1.8 Separate Endpoint Using POST Method for Deleting Record
  app.post('/api/football/delete/:team', async (req, res) => {
    try {
      const deletedData = await Football.findOneAndDelete({ team: req.params.team });
      res.json(deletedData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // 1.7 Separate Get Method to Show Total Games Played, Draw, and Won for the Given Year
  app.get('/api/football/stats/:year', async (req, res) => {
    try {
      const { year } = req.params;
      const stats = await Football.aggregate([
        { $match: { year: parseInt(year) } },
        {
          $group: {
            _id: null,
            totalGamesPlayed: { $sum: '$gamesPlayed' },
            totalDraw: { $sum: '$draw' },
            totalWin: { $sum: '$win' },
          },
        },
      ]);
      res.json(stats[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // 1.9 Endpoint to Display First 10 Records with "Won" Greater Than a Given Value
  app.get('/api/football/top-teams/:wonValue', async (req, res) => {
    try {
      const { wonValue } = req.params;
      const topTeams = await Football.find({ win: { $gt: parseInt(wonValue) } }).limit(10);
      res.json(topTeams);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // 2.0 Endpoint with Query to Display All Teams Where Average "Goal For" for a Given Year
  app.get('/api/football/average-goals/:year', async (req, res) => {
    try {
      const { year } = req.params;
      const averageGoals = await Football.aggregate([
        { $match: { year: parseInt(year) } },
        {
          $group: {
            _id: '$team',
            averageGoalFor: { $avg: '$goalsFor' },
          },
        },
      ]);
      res.json(averageGoals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  



console.log('ss');


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
