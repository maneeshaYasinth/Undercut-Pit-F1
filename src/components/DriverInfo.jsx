import React, { useEffect, useState } from 'react';
import { fetchDriversForSession } from '../services/api';
import driverinfo2 from '../assets/driverinfo2.jpg'

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

  if (loading) return <p class="text-black text-2xl flex items-center justify-center h-full mt-32 ">Loading...</p> ;
  if (error) return <p class="text-black text-2xl flex items-center justify-center h-full">Error: {error}</p>;

  return (
    <div id='DriverInfo'>
    <div className="pt-20 p-4  rounded shadow w-full" style={{ backgroundImage: `url(${driverinfo2})`, backgroundSize: 'cover', backgroundPosition: 'center' , backgroundAttachment: 'fixed'}}>
    <h1 className="text-5xl font-sans mb-4 text-center relative pb-3 bg-gradient-to-r from-white via-amber-100 to-yellow-500 bg-clip-text text-transparent">
  Drivers in 2024 Session
  <span className="absolute w-full h-1 bottom-0 left-0 flex justify-center">
    <span className="bg-gray-400 w-72"></span>
  </span>
</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
        {drivers.map(driver => (
          <div key={driver.driver_number} className="relative">
            <div className="p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">{driver.full_name}</h2>
              <img src={driver.headshot_url} alt={driver.full_name} className="mb-4 rounded-lg" />
              <p><strong>Team:</strong> {driver.team_name}</p>
              <p><strong>Country:</strong> {driver.country_code}</p>
              <p><strong>Number:</strong> {driver.driver_number}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default DriverInfo;
