// Weather.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://api.openf1.org/v1';

const Weather = ({ sessionKey }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/weather`, {
          params: {
            session_key: sessionKey,
            'wind_direction>': '130',
            'track_temperature>': '52'
          }
        });
        setWeatherData(response.data);
      } catch (error) {
        setError('Error fetching weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [sessionKey]);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!weatherData) return <p>No weather data available</p>;

  return (
    <div className="p-4 bg-gradient-to-r from-purple-900 via-fuchsia-900 to-pink-900 rounded shadow w-full">
      <h1 className="text-5xl text-gray-400 font-sans mb-4 text-center relative pb-3">
        Weather Information
        <span className="absolute w-full h-1 bottom-0 left-0 flex justify-center">
          <span className="bg-gray-400 w-72"></span>
        </span>
      </h1>
      <div className="grid grid-cols-1 gap-4 p-8">
        <div className="relative">
          <div className="p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg">
            <p><strong>Air Temperature:</strong> {weatherData[0].air_temperature} °C</p>
            <p><strong>Humidity:</strong> {weatherData[0].humidity} %</p>
            <p><strong>Pressure:</strong> {weatherData[0].pressure} mbar</p>
            <p><strong>Rainfall:</strong> {weatherData[0].rainfall ? 'Yes' : 'No'}</p>
            <p><strong>Wind Speed:</strong> {weatherData[0].wind_speed} m/s</p>
            <p><strong>Wind Direction:</strong> {weatherData[0].wind_direction}°</p>
            <p><strong>Track Temperature:</strong> {weatherData[0].track_temperature} °C</p>
            <p><strong>Last updated:</strong> {new Date(weatherData[0].date).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
