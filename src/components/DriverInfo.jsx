import React, { useEffect, useState } from 'react';
import { fetchDriversForSession } from '../services/api';

const DriverInfo = ({ sessionKey }) => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDrivers = async () => {
      try {
        const data = await fetchDriversForSession(sessionKey);
        setDrivers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getDrivers();
  }, [sessionKey]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 bg-gray-100 rounded shadow w-full">
      <h1 className="text-2xl font-bold mb-4">Drivers in 2024 Session</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {drivers.map(driver => (
          <div key={driver.driver_number} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-2">{driver.full_name}</h2>
            <img src={driver.headshot_url} alt={driver.full_name} className="mb-4 rounded" />
            <p><strong>Team:</strong> {driver.team_name}</p>
            <p><strong>Country:</strong> {driver.country_code}</p>
            <p><strong>Number:</strong> {driver.driver_number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverInfo;
