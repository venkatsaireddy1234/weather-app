import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapContainer from './MapContainer'; // Import the MapContainer component

const RealTimeWeatherScreen = () => {
  const [weatherData, setWeatherData] = useState(null);

  // Function to fetch weather data based on latitude and longitude
  const fetchData = async (latitude, longitude) => {
    const API_KEY = "12a3107fe6f63e85d0efdf00177e6206";
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(API_URL);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to handle location selection from the map
  const handleLocationSelect = (location) => {
    const [latitude, longitude] = location.split(',');
    fetchData(latitude, longitude);
  };

  useEffect(() => {
    // Fetch weather data for New York initially
    fetchData(40.7128, -74.0060); // Latitude and longitude for New York
  }, []);

  return (
    <div className="container mx-auto py-8" style={{ backgroundImage: `url('path_to_your_background_image.jpg')` }}>
      {weatherData ? (
        <div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">{weatherData.name}</h1>
            <p className="text-lg">{weatherData.sys.country}</p>
          </div>
          <div className="flex justify-center items-center mt-8">
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt="Weather Icon"
              className="w-24 h-24"
            />
            <div className="ml-6">
              <p className="text-2xl font-bold">{weatherData.main.temp}°C</p>
              <p className="text-lg">{weatherData.weather[0].description}</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
            <p className="text-lg">Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}

      <MapContainer onLocationSelect={handleLocationSelect} />
    </div>
  );
};

export default RealTimeWeatherScreen;
