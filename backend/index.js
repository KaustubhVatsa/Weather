import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/ConnectDb.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import cron from "node-cron"; // Import node-cron
import { fetchWeatherData } from "./controller/weatherController.js";


dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use('/api', weatherRoutes); // Use the weather routes

// Schedule the weather data fetching every 5 minutes
cron.schedule('*/5 * * * *', () => {
  console.log('Fetching weather data...');
  fetchWeatherData; // Call your fetch function here
});

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port:", PORT);
});
