// src/App.jsx

import React, { useState, useEffect } from 'react';
import DriverInfo from './components/DriverInfo';
import SessionInfo from './components/Sessions';
import RaceControlInfo from './components/RaceControlInfo';

const App = () => {
  const [sessionKey, setSessionKey] = useState('latest');
  const flag = 'BLACK AND WHITE';
  const driverNumber = 1;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch('https://api.openf1.org/v1/sessions', {
          params: {
            session_key: 'latest'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch session data');
        }
        const data = await response.json();
        if (data && data.length > 0) {
          const session = data[0];
          setStartDate(new Date(session.date_start).toISOString());
          setEndDate(new Date(session.date_end).toISOString());
        } else {
          throw new Error('No session data available');
        }
      } catch (error) {
        console.error('Error fetching session data:', error);
        setError('Error fetching session data');
      }
    };

    fetchSessionData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <DriverInfo sessionKey={sessionKey} />
      <SessionInfo sessionKey={sessionKey} />
      {startDate && endDate && (
        <RaceControlInfo
          sessionKey={sessionKey}
          flag={flag}
          driverNumber={driverNumber}
        />
      )}
    </>
  );
};

export default App;
