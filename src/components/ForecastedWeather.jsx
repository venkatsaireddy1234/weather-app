import React from 'react';

const ForecastedWeatherScreen = ({ forecastData }) => {
  return (
    <div className="container mx-auto py-8 bg-opacity-50 rounded-md" style={{ backgroundImage: `url('Images/Forecast.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {forecastData ? (
        <div>
          <h1 className="text-3xl font-bold text-center mb-4 text-white" >Forecasted Weather for next week</h1>
          <div className="grid grid-cols-3 gap-4 m-2 p-2">
            {forecastData.daily.time.map((date, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-md bg-opacity-70">
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
