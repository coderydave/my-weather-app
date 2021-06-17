import React, { useEffect, useState } from "react";
import './App.scss';

const API_URL = 'https://api.openweathermap.org/data/2.5'
const API_KEY = '27f0db16932c5a503fedac29d69506f2'


function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [apiData, setApidata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //Get geolocation
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      //Get weather data with geolocation cords
      await fetch(`${API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setApidata(result)
          console.log(result);
        });
    }
    fetchData();
  }, [lat, long])

  console.log("data", apiData);

  return (
    <div className="App">
      <p>app</p>
    </div>
  );
}

export default App;
