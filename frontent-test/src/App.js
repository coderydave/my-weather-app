import React, { useEffect, useState, useCallback, useRef } from "react";
import WeatherCard from './components/weathercard/WeatherCard.jsx';
import axios from 'axios';
import './App.scss';

const API_KEY = '27f0db16932c5a503fedac29d69506f2'


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('');
  const cityRef = useRef('');

  const refresh = () => {
    window.location.reload();
  }

  const getWeatherByCityName = useCallback(async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${API_KEY}`;

    try {
      const { data } = await axios.get(url);
      setWeatherData(data);
      cityRef.current = data.name;
    } catch (err) {
      alert('No such settlement can be found!');
      setCityName(cityRef.current);
    }
  }, [setWeatherData, cityName]);

  const getWeatherByCoords = useCallback(
    async position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

      try {
        const { data } = await axios.get(url);
        console.log(data);
        cityRef.current = data.name;
        setCityName(data.name);
        setWeatherData(data);
      } catch (err) {
        alert('No such settlement can be found!');
      }
    },
    [setWeatherData, setCityName]
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getWeatherByCoords, console.error);
  }, [getWeatherByCoords]);

  return (
    <div className="App">
      <div className="head">
        <h2>Weather APP</h2>
        <div className="title">
          <input className="search-field"
            placeholder="Budapest"
            value={cityName}
            onChange={e => setCityName(e.target.value)}
          />
          <button className="search-btn" onClick={getWeatherByCityName}>Search</button>
        </div>
      </div>
      {weatherData ? (
        <WeatherCard weatherData={weatherData} />
      ) : (
        <div class="lds-dual-ring"></div>
      )}
    </div>
  );
}

export default App;
