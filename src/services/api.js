import axios from 'axios';

const BASE_URL = 'https://api.openf1.org/v1';

export const fetchCurrentSeasonRaces = async () => {
  const response = await axios.get(`${BASE_URL}/races`);
  return response.data;
};

export const fetchRaceResults = async (raceId) => {
  const response = await axios.get(`${BASE_URL}/races/${raceId}/results`);
  return response.data;
};

export const fetchDriversForSession = async (sessionKey) => {
  const response = await axios.get(`${BASE_URL}/drivers`, {
    params: { session_key: sessionKey }
  });
  return response.data;
};


export const fetchTeamRadio = async (sessionKey, driverNumber) => {
  const url = `https://api.openf1.org/v1/team_radio?session_key=${sessionKey}&driver_number=${driverNumber}`;
  console.log('Fetching from URL:', url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch team radio data');
  }
  const data = await response.json();
  console.log('Fetched data:', data);
  return data;
};
