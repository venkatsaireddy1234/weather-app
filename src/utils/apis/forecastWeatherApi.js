import axios from 'axios';

export const fetchForecastedWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forecasted weather data:', error);
    return null;
  }
};
