// src/components/RaceControlInfo.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://api.openf1.org/v1';

const RaceControlInfo = ({ sessionKey, flag, driverNumber }) => {
  const [raceControlData, setRaceControlData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRaceControlData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/race_control`, {
          params: {
            session_key: sessionKey,
            flag,
            driver_number: driverNumber
          }
        });
        setRaceControlData(response.data);
      } catch (error) {
        setError('Error fetching race control data');
      } finally {
        setLoading(false);
      }
    };

    fetchRaceControlData();
  }, [sessionKey, flag, driverNumber]);

  if (loading) return <p>Loading race control data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!raceControlData.length) return <p>No race control data available</p>;

  return (
    <div className="p-4 bg-gradient-to-r from-green-900 via-blue-900 to-indigo-900 rounded shadow w-full">
      <h1 className="text-5xl text-gray-400 font-sans mb-4 text-center relative pb-3">
        Race Control Information
        <span className="absolute w-full h-1 bottom-0 left-0 flex justify-center">
          <span className="bg-gray-400 w-72"></span>
        </span>
      </h1>
      <div className="grid grid-cols-1 gap-4 p-8">
        {raceControlData.map((event, index) => (
          <div key={index} className="relative">
            <div className="p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">Event on Lap {event.lap_number}</h2>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
              <p><strong>Driver Number:</strong> {event.driver_number}</p>
              <p><strong>Flag:</strong> {event.flag}</p>
              <p><strong>Message:</strong> {event.message}</p>
              <p><strong>Scope:</strong> {event.scope}</p>
              <p><strong>Sector:</strong> {event.sector}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaceControlInfo;
