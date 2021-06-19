import React from "react";
import "./WeatherCard.scss";

const ICON_URL = "https://openweathermap.org/img/w";

const WeatherCard = ({ weatherData }) => (
  <div className="main">
    <div className="header">
      {weatherData.name}
      <span class="weather-icon">
        <img
          src={`${ICON_URL}/${weatherData.weather[0].icon}.png`}
          alt="icon"
        />
      </span>
    </div>

    <div className="body">
      <p className="temp">
        Temprature: <span id="span"> {`${weatherData.main.temp}C°`} </span>
      </p>
      <p className="temp">
        Description:
        <span id="span"> {weatherData.weather[0].description}</span>
      </p>
    </div>
  </div>
);

export default WeatherCard;
