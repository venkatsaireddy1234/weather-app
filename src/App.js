import "./App.css";
import WeatherApp from "./components/WeatherApp";

// Add this code at the beginning of your Node.js application


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
