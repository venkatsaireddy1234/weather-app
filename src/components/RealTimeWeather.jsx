import React from 'react';

const RealTimeWeatherScreen = ({ weatherData, handlePinCodeChange }) => {
  return (
    <div className="container mx-auto py-8 bg-cover rounded-md	" style={{ backgroundImage: `url('/Images/RealTime.jpg')` }}>
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

    </div>
  );
};

export default RealTimeWeatherScreen;
