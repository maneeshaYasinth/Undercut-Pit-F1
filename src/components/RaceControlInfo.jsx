// src/components/RaceControlInfo.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://api.openf1.org/v1';

const RaceControlInfo = ({ sessionKey, flag }) => {
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
          },
        });
        setRaceControlData(response.data);
      } catch (error) {
        console.error('Error fetching race control data:', error);
        setError('Error fetching race control data');
      } finally {
        setLoading(false);
      }
    };

    fetchRaceControlData();
  }, [sessionKey, flag]);

  if (loading) return <p class="text-black text-2xl flex items-center justify-center h-full mt-32 ">Loading race control data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!raceControlData.length) return <p class="text-black text-2xl flex items-center justify-center h-full mt-32 ">No race control data available</p>;

  // Grouping race control data by driver number
  const groupedByDriver = raceControlData.reduce((acc, event) => {
    const driverNumber = event.driver_number;
    if (!acc[driverNumber]) {
      acc[driverNumber] = [];
    }
    acc[driverNumber].push(event);
    return acc;
  }, {});

  // Mapping over grouped data to render cards for each driver
  return (
    <div id='RaceControlInfo' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.keys(groupedByDriver).map((driverNumber) => (
        <div key={driverNumber} className="p-4 bg-gradient-to-r from-green-900 via-blue-900 to-indigo-900 rounded shadow">
          <h2 className="text-xl font-bold mb-2 text-white">Driver {driverNumber}</h2>
          {groupedByDriver[driverNumber].map((event, index) => (
            <div key={index} className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-4 mb-4">
              <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
              <p><strong>Flag:</strong> {event.flag}</p>
              <p><strong>Message:</strong> {event.message}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RaceControlInfo;
