import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import RealTimeWeatherScreen from "../components/RealTimeWeather";
import ForecastedWeatherScreen from "../components/ForecastedWeather";
import { fetchRealTimeWeather } from "../utils/apis/realTimeWeatherApi";
import { fetchForecastedWeather } from "../utils/apis/forecastWeatherApi";
import { getLatLngFromPincode } from "../utils/apis/getLatitudeFromPincodeApi";

const WeatherApp = () => {
  const [realTimeWeatherData, setRealTimeWeatherData] = useState(null);
  const [forecastedWeatherData, setForecastedWeatherData] = useState(null);
  const [pinCode, setPinCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch initial weather data for New York
    fetchInitialWeatherData();
  }, []); // Empty dependency array ensures this effect runs only once, on component mount

  const fetchInitialWeatherData = async () => {
    try {
      // Fetch real-time weather data for New York
      const realTimeData = await fetchRealTimeWeather(40.7128, -74.006);
      setRealTimeWeatherData(realTimeData);

      // Fetch forecasted weather data for New York
      const forecastedData = await fetchForecastedWeather(40.7128, -74.006);
      setForecastedWeatherData(forecastedData);
    } catch (error) {
      console.error("Error fetching initial weather data:", error);
    }
  };

  const handlePinCodeChange = (event) => {
    setPinCode(event.target.value);
  };

  const handleSearch = async () => {
    if (pinCode.trim() !== "") {
      setLoading(true);
      try {
        const { latitude, longitude } = await getLatLngFromPincode(pinCode);
        await fetchData(latitude, longitude);
      } catch (error) {
        console.error("Error fetching location:", error.message);
        alert("An error occurred while fetching the location. Please try again later.");
      } finally {
        setLoading(false);
        setPinCode("");
      }
    } else {
      alert("Please enter a valid pin code");
    }
  };

  const fetchData = async (latitude, longitude) => {
    try {
      // Fetch real-time weather data
      const realTimeData = await fetchRealTimeWeather(latitude, longitude);
      setRealTimeWeatherData(realTimeData);

      // Fetch forecasted weather data
      const forecastedData = await fetchForecastedWeather(latitude, longitude);
      setForecastedWeatherData(forecastedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="p-8 bg-left-top	" style={{ backgroundImage: "url('/Images/weather.jpg')" }} >
      <h1 className="text-4xl font-bold mb-8 text-center">Weather App</h1>
      <div className="mb-4 flex justify-center items-center space-x-4"> {/* Added margin bottom and adjusted spacing */}
        <input type="text" value={pinCode} onChange={handlePinCodeChange} placeholder="Enter pin code" className="px-4 py-2 border rounded-lg" />
        <button onClick={handleSearch} disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer">{loading ? "Loading..." : "Search"}</button>
      </div>
      <Tabs>
        <TabList>
          <Tab>Real Time Weather</Tab>
          <Tab>Forecasted Weather</Tab>
        </TabList>

        <TabPanel>
          <RealTimeWeatherScreen weatherData={realTimeWeatherData} />
        </TabPanel>
        <TabPanel>
          <ForecastedWeatherScreen forecastData={forecastedWeatherData} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default WeatherApp;
