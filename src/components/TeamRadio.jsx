import React, { useState } from 'react';
import { fetchTeamRadio } from '../services/api';
import sessionBg from '../assets/sessionBg.jpg';

const TeamRadio = ({ sessionKey }) => {
  const [driverNumber, setDriverNumber] = useState('');
  const [radioData, setRadioData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  const handleFetchRadioData = async () => {
    if (!driverNumber) return;

    setLoading(true);
    setError(null);
    setHasFetched(true);

    try {
      const data = await fetchTeamRadio(sessionKey, driverNumber);
      data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sorting
      setRadioData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${sessionBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      <div className="container mx-auto p-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg mt-10">
        <h1 className="text-3xl font-bold text-white mb-8 mt-16 text-center">Select a Driver Number</h1>
        <div className="flex flex-col items-center justify-center mb-8">
          <label className="text-white mb-4">Driver Number:</label>
          <input
            type="number"
            value={driverNumber}
            onChange={(e) => setDriverNumber(e.target.value)}
            className="bg-white bg-opacity-20 rounded-lg shadow-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-xs text-center"
            min="0"
          />
        </div>
        <div className="pt-4 p-2 rounded shadow w-full">
          {hasFetched && (
            <h1 className="text-3xl font-bold text-white mb-8 mt-12 text-center">Latest Team Radio</h1>
          )}

          <div className="flex items-center justify-center mb-4">
            <button
              onClick={handleFetchRadioData}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
            >
              Fetch Radio Data
            </button>
          </div>

          {loading && <p className="text-black text-2xl flex items-center justify-center h-full mt-32">Loading...</p>}
          {error && <p className="text-black text-2xl flex items-center justify-center h-full mt-32">Error: {error}</p>}

          <div className="grid grid-cols-1 gap-4">
            {radioData.length > 0 && radioData.map((radio, index) => (
              <div key={index} className="p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-2">{new Date(radio.date).toLocaleString()}</h2>
                <audio controls src={radio.recording_url} className="w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamRadio;
