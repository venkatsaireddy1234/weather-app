import React from 'react';

const ForecastedWeatherScreen = ({ forecastData }) => {
  return (
    <div className="container mx-auto py-8">
      {forecastData ? (
        <div>
          <h1 className="text-3xl font-bold text-center mb-4">Forecasted Weather for next week</h1>
          <div className="grid grid-cols-3 gap-4">
            {forecastData.daily.time.map((date, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-md">
                <p className="text-lg font-bold">{date}</p>
                <p className="text-lg">{forecastData.daily.temperature_2m_max[index]}°C</p>
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
