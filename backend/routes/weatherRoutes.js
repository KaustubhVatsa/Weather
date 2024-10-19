import express from 'express';
import Weather from '../models/weather.js';
import { fetchWeatherData } from '../controller/weatherController.js';

const router = express.Router();

// Route to fetch weather data for all cities
router.get('/weather', async (req, res) => {
  try {
    const weatherData = await Weather.find();
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

// Route to fetch weather data for a specific city
router.get('/weather/:city', async (req, res) => {
  const { city } = req.params;
  try {
    const weatherData = await Weather.findOne({ city });
    if (weatherData) {
      res.status(200).json(weatherData);
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});
router.get('/fetch', async (req, res) => {
    try {
      await fetchWeatherData();
      res.status(200).json({ message: 'Weather data fetched and stored successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch weather data.', error: error.message });
    }
  });
  
// Route to manually fetch and update weather data
router.post('/weather/update', async (req, res) => {
  try {
    await fetchWeatherData();
    res.status(200).json({ message: 'Weather data updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating weather data' });
  }
});

export default router;
