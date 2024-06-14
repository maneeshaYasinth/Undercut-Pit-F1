// src/services/api.js
export const fetchCurrentSeasonRaces = async () => {
    const response = await fetch('http://ergast.com/api/f1/current.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  