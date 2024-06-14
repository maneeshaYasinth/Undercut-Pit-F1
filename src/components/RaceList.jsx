import React, { useEffect, useState } from 'react';
import { fetchCurrentSeasonRaces } from '../services/api';

const RaceList = () => {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRaces = async () => {
      try {
        const data = await fetchCurrentSeasonRaces();
        setRaces(data.MRData.RaceTable.Races);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getRaces();
  }, []);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 mr-10">
      <h1 className="text-2xl font-bold mb-4">Current Season Race Schedule</h1>
      <ul>
        {races.map(race => (
          <li key={race.round} className="mb-2  text-blue-900">
            {race.raceName} - {new Date(race.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RaceList;
