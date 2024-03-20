import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RealTimeWeather from './RealTimeWeather';
import ForecastedWeather from './ForecastedWeather';

const WeatherApp =() => {
  const [realTimeWeather, setRealTimeWeather] = useState({
    location: '',
    temperature: 0,
    description: '',
  });

  const [forecastedWeather, setForecastedWeather] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const realTimeWeatherResponse = await axios.get(
          "https://api.tomorrow.io/v4/weather/realtime?location=42.3478,-71.0466&apikey=etqzL8mWnjQI3mE91XgYVcqpZHjVBagd"
        );

        const forecastedWeatherResponse = await axios.get(
            "https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=etqzL8mWnjQI3mE91XgYVcqpZHjVBagd"

        );

        setRealTimeWeather({
          location: realTimeWeatherResponse.data.location.name,
          temperature: realTimeWeatherResponse.data.data.temperature,
          description: realTimeWeatherResponse.data.data.weather.description,
        });

        setForecastedWeather(
          forecastedWeatherResponse.data.data.daily.splice(1, 5).map((item) => ({
            date: item.valid_at,
            temperature: item.temperatureMax,
            description: item.weather.description,
          }))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Weather App
      </h1>
      <RealTimeWeather {...realTimeWeather} />
      <h2 className="text-2xl font-bold mt-8 mb-2">
        Forecasted Weather
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {forecastedWeather.map((item, index) => (
          <ForecastedWeather key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;