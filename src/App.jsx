import React, { useState, useEffect } from 'react';
import DriverInfo from './components/DriverInfo';
import SessionInfo from './components/Sessions';
import Weather from './components/weather';
import Navbar from './components/navbar';
import Home from './components/home';
import ConditionalRaceControlInfo from './components/ConditionalRaceControlInfo';
import { Route, Routes } from 'react-router-dom';
import CarData from './components/carData';

const App = () => {
  const [sessionKey, setSessionKey] = useState('latest');
  const flag = 'BLACK AND WHITE'; // Adjust flag as needed
  const DRIVER_NUMBER = 55;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(null);


  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/DriverInfo" element={<DriverInfo sessionKey={sessionKey} />} />
        <Route path="/carData" element={<CarData sessionKey={sessionKey} />} />
        <Route path="/SessionInfo" element={<SessionInfo sessionKey={sessionKey} />} />
        <Route path="/RaceControlInfo" element={
          <ConditionalRaceControlInfo 
            sessionKey={sessionKey} 
            flag={flag} 
            startDate={startDate} 
            endDate={endDate} 
          />
        } />
      </Routes>
    </>
  );
};

export default App;
