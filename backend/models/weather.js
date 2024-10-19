import mongoose from "mongoose";
const weatherSchema = new mongoose.Schema({
    city: {
      type: String,
      required: true,
    },
    main: String,
    description: String, // Added description
    temp: Number,
    feels_like: Number,
    humidity: Number, // Added humidity
    wind_speed: Number, // Added wind speed
    timestamp: {
      type: Date,
      default: Date.now,
    },
  });
  
// Use default export for the Weather model
const Weather = mongoose.model('Weather', weatherSchema);
export default Weather; // Exporting the model as default
