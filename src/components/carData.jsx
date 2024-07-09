import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sessionBg from '../assets/sessionBg.jpg'

const BASE_URL = 'https://api.openf1.org/v1';

const CarData = () => {
  const [driverNumber, setDriverNumber] = useState('');
  const [sessionKey, setSessionKey] = useState('latest');
  const [carData, setCarData] = useState(null);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCarData = async (driverNum) => {
    if (!driverNum) return; // Skip fetching if driverNumber is empty
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/car_data`, {
        params: {
          driver_number: driverNum,
          session_key: sessionKey,
          'speed>': 315
        }
      });
      const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setCarData(sortedData[0]);
    } catch (error) {
      setError('Error fetching car data');
    } finally {
      setLoading(false);
    }
  };

  const fetchPositions = async (driverNum) => {
    if (!driverNum) return; // Skip fetching if driverNumber is empty
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/position`, {
        params: {
          meeting_key: 'latest',
          driver_number: driverNum,
          'position<': 4
        }
      });
      const sortedPositions = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setPositions(sortedPositions);
    } catch (error) {
      setError('Error fetching positions data');
    } finally {
      setLoading(false);
    }
  };

  const handleDriverNumberChange = async (event) => {
    const newDriverNumber = event.target.value;
    setDriverNumber(newDriverNumber);
    await fetchCarData(newDriverNumber);
    await fetchPositions(newDriverNumber);
  };

  useEffect(() => {
    // Fetch initial data on component mount
    fetchCarData(driverNumber);
    fetchPositions(driverNumber);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="min-h-screen" style={{ backgroundImage: `url(${sessionBg})`, backgroundSize: 'cover', backgroundPosition: 'center' , backgroundAttachment: 'fixed'}}>
      <div className="container mx-auto p-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg mt-10">
        <h1 className="text-3xl font-bold text-white mb-8 mt-16">Select a Driver Number</h1>
        <div className="flex items-center justify-center mb-8">
          <label className="text-white mr-4">Driver Number:</label>
          <input
            type="number"
            value={driverNumber}
            onChange={handleDriverNumberChange}
            className="bg-white bg-opacity-20 rounded-lg shadow-lg p-2"
            min="0"
          />
        </div>
        {loading ? (
          <p className="text-black text-2xl flex items-center justify-center h-full mt-32">Loading data...</p>
        ) : error ? (
          <p className="text-black text-2xl flex items-center justify-center h-full mt-32">Error: {error}</p>
        ) : (
          <>
            {carData && (
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-4 mb-4">
                <p><strong>Date:</strong> {new Date(carData.date).toLocaleString()}</p>
                <p><strong>Speed:</strong> {carData.speed} km/h</p>
                <p><strong>RPM:</strong> {carData.rpm}</p>
                <p><strong>Throttle:</strong> {carData.throttle}</p>
                <p><strong>Brake:</strong> {carData.brake}</p>
                <p><strong>DRS:</strong> {carData.drs}</p>
              </div>
            )}
            {positions.length > 0 && (
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-4">
                <h2 className="text-2xl font-bold text-white">Positions for Driver {driverNumber}</h2>
                {/* Display latest position separately */}
                {positions.length > 0 && (
                  <div>
                    <p><strong>Position:</strong> {positions[0].position}</p>
                    <p><strong>Date:</strong> {new Date(positions[0].date).toLocaleString()}</p>
                    <p><strong>Meeting Key:</strong> {positions[0].meeting_key}</p>
                  </div>
                )}
                {/* Display other positions */}
                {positions.slice(1).map((position, index) => (
                  <div key={index} className="mt-4">
                    <p><strong>Position:</strong> {position.position}</p>
                    <p><strong>Date:</strong> {new Date(position.date).toLocaleString()}</p>
                    <p><strong>Meeting Key:</strong> {position.meeting_key}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CarData;
