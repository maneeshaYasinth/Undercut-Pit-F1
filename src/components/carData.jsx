import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://api.openf1.org/v1';

const CarData = ({ driverNumber, sessionKey }) => {
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/car_data`, {
          params: {
            driver_number: driverNumber,
            session_key: sessionKey,
            speed: '>=315'
          }
        });
        setCarData(response.data);
      } catch (error) {
        setError('Error fetching car data');
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [driverNumber, sessionKey]);

  if (loading) return <p class="text-black text-2xl flex items-center justify-center h-full mt-32 ">Loading car data...</p>;
  if (error) return <p class="text-black text-2xl flex items-center justify-center h-full mt-32 ">Error: {error}</p>;
  if (carData.length === 0) return <p class="text-black text-2xl flex items-center justify-center h-full mt-32 ">No car data available</p>;

  return (
    <div className="bg-gradient-to-r from-purple-900 via-fuchsia-900 to-pink-900 min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-white mb-8">Car Data for Driver {driverNumber}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {carData.map((data, index) => (
            <div key={index} className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-4">
              <p><strong>Date:</strong> {new Date(data.date).toLocaleString()}</p>
              <p><strong>Speed:</strong> {data.speed} km/h</p>
              <p><strong>RPM:</strong> {data.rpm}</p>
              <p><strong>Throttle:</strong> {data.throttle}</p>
              <p><strong>Brake:</strong> {data.brake}</p>
              <p><strong>DRS:</strong> {data.drs}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarData;
