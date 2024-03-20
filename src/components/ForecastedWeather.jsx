import React, { useState, useEffect } from "react";
import axios from "axios";

const ForecastedWeatherScreen = () => {
  const [forecastData, setForecastData] = useState(null);
  const API_KEY = "12a3107fe6f63e85d0efdf00177e6206";
  const API_URL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid=${API_KEY}`;
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setForecastData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [API_URL]);
  console.log(forecastData);
  return (
    <div className="container mx-auto py-8">
      {forecastData ? (
        <div>
          <h1 className="text-3xl font-bold text-center mb-4">
            Forecasted Weather
          </h1>
          <div className="grid grid-cols-3 gap-4">
            {forecastData.timelines[0].intervals.map((interval, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-md">
                <p className="text-lg font-bold">
                  {interval.startTime.slice(0, 10)}
                </p>
                <img
                  src={`https://www.weatherbit.io/static/img/icons/${interval.values.weatherCode}.png`}
                  alt="Weather Icon"
                  className="w-16 h-16 mx-auto my-2"
                />
                <p className="text-lg">{interval.values.temperature}°C</p>
                <p className="text-lg">
                  {interval.values.precipitationProbability}% Precipitation
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default ForecastedWeatherScreen;
