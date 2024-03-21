import React from 'react';
import { WiSunrise, WiSunset } from 'react-icons/wi';

const RealTimeWeatherScreen = ({ weatherData }) => {
  // Function to convert temperature from Kelvin to Celsius
  const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  // Function to convert timestamp to time string
  const convertTimestampToTimeString = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container mx-auto py-8 bg-cover rounded-md" style={{ backgroundImage: `url('/Images/RealTime.jpg')` }}>
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
              {/* Convert temperature from Kelvin to Celsius */}
              <p className="text-2xl font-bold">{convertKelvinToCelsius(weatherData.main.temp)}°C</p>
              <p className="text-lg">{weatherData.weather[0].description}</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
            <p className="text-lg">Wind Speed: {weatherData.wind.speed} m/s</p>
            {/* Display sunrise and sunset timings */}
            <div className="flex justify-center items-center mt-4">
              <WiSunrise size={24} color="orange" className="mr-2" />
              <p className="text-lg">Sunrise: {convertTimestampToTimeString(weatherData.sys.sunrise)}</p>
            </div>
            <div className="flex justify-center items-center mt-2">
              <WiSunset size={24} color="orange" className="mr-2" />
              <p className="text-lg">Sunset: {convertTimestampToTimeString(weatherData.sys.sunset)}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}

    </div>
  );
};

export default RealTimeWeatherScreen;
