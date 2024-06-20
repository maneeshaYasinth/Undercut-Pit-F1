// src/App.jsx
import React, { useEffect, useState } from 'react';
import { fetchCurrentSeasonRaces } from './services/api';
import DriverInfo from './components/DriverInfo';
import Weather from './components/weather';

const App = () => {
  

  return (<>
      <DriverInfo sessionKey={9158} />
      <Weather />
      </>
  );
};

export default App;
