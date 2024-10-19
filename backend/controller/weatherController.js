import axios from 'axios';
import Weather from '../models/weather.js';

export const fetchWeatherData = async () => {
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    for (const city of cities) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );

      // Extract weather data
      const { main, description } = response.data.weather[0];
      const { temp, feels_like, humidity } = response.data.main;
      const tempInCelsius = temp - 273.15; // Convert Kelvin to Celsius
      const feelsLikeInCelsius = feels_like - 273.15;

      // Save data to MongoDB
      const weatherData = new Weather({
        city,
        main, // Using shorthand property
        description, // Storing description
        temp: tempInCelsius,
        feels_like: feelsLikeInCelsius,
        humidity, // Storing humidity
        wind_speed: response.data.wind.speed, // Storing wind speed
      });

      await weatherData.save();
      console.log(`Weather data saved for ${city}`);
    }
  } catch (error) {
    console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
  }
};
