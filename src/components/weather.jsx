// Weather.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://api.openf1.org/v1';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/weather`, {
          params: {
            meeting_key: '1208',
            'wind_direction>': '130',
            'track_temperature>': '52'
          }
        });
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
    // You can add dependencies if needed
  }, []); // Empty dependency array to run effect only once

  return (
    <div>
      <h2>Weather</h2>
      {weatherData ? (
        <div>
          <p>Air Temperature: {weatherData[0].air_temperature} °C</p>
          <p>Humidity: {weatherData[0].humidity} %</p>
          <p>Pressure: {weatherData[0].pressure} mbar</p>
          <p>Rainfall: {weatherData[0].rainfall ? 'Yes' : 'No'}</p>
          <p>Wind Speed: {weatherData[0].wind_speed} m/s</p>
          <p>Wind Direction: {weatherData[0].wind_direction}°</p>
          <p>Track Temperature: {weatherData[0].track_temperature} °C</p>
          <p>Last updated: {new Date(weatherData[0].date).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
