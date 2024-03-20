import "./App.css";
import ForecastedWeatherScreen from "./components/ForecastedWeather";
import RealTimeWeatherScreen from "./components/RealTimeWeather";
import WeatherApp from "./components/WeatherApp";

function App() {
  return (
    <div className="App">
      <WeatherApp />
      {/* <RealTimeWeatherScreen /> */}
      {/* <ForecastedWeatherScreen /> */}
    </div>
  );
}

export default App;
