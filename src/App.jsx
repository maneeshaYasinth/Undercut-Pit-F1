// src/App.jsx
import React, { useEffect, useState } from 'react';
import { fetchCurrentSeasonRaces } from './services/api';
import DriverInfo from './components/DriverInfo';
import Weather from './components/weather';
import SessionInfo from './components/Sessions';

const App = () => {
  const sessionKey = 9533;

  return (<>
      <DriverInfo sessionKey={sessionKey} />
      {/* <Weather sessionKey={sessionKey} /> */}
      <SessionInfo sessionKey={sessionKey} />
      </>
  );
};

export default App;
