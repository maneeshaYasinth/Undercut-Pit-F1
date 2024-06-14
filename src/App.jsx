// src/App.jsx
import React, { useEffect, useState } from 'react';
import { fetchCurrentSeasonRaces } from './services/api';
import RaceList from './components/RaceList';

const App = () => {
  

  return (
  <RaceList />
  );
};

export default App;
