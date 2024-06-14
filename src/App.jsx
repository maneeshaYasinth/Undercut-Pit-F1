// src/App.jsx
import React, { useEffect, useState } from 'react';
import { fetchCurrentSeasonRaces } from './services/api';
import DriverInfo from './components/DriverInfo';

const App = () => {
  

  return (
  <DriverInfo />
  );
};

export default App;
