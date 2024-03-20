import axios from "axios";

const API_KEY = "12a3107fe6f63e85d0efdf00177e6206";
export const fetchRealTimeWeather = async (latitude, longitude) => {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching real-time weather data:", error);
    return null;
  }
};
