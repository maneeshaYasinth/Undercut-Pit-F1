import React, { useEffect, useState } from 'react';
import { fetchDriverInfo } from '../services/api';

const DriverInfo = ({ driverNumber, sessionKey }) => {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDriverInfo = async () => {
      try {
        const data = await fetchDriverInfo(driverNumber, sessionKey);
        setDriver(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getDriverInfo();
  }, [driverNumber, sessionKey]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{driver.full_name}</h1>
      <img src={driver.headshot_url} alt={driver.full_name} className="mb-4 rounded" />
      <p><strong>Team:</strong> {driver.team_name}</p>
      <p><strong>Country:</strong> {driver.country_code}</p>
      <p><strong>Number:</strong> {driver.driver_number}</p>
    </div>
  );
};

export default DriverInfo;
