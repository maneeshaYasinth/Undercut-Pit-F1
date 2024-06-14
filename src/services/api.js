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

export const fetchDriverInfo = async (driverNumber, sessionKey) => {
  const response = await axios.get(`${BASE_URL}/drivers`, {
    params: {
      driver_number: driverNumber,
      session_key: sessionKey
    }
  });
  return response.data;
};
