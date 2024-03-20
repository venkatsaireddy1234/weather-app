import axios from "axios";
const dotenv = require("dotenv");
dotenv.config();

const { weatherApiUrl, weatherApiKey } = process.env;

export const fetchRealTimeWeather = async (latitude, longitude) => {
  const API_URL = `${weatherApiUrl}=${latitude}&lon=${longitude}&APPID=${weatherApiKey}&units=metric`;

  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching real-time weather data:", error);
    return null;
  }
};
