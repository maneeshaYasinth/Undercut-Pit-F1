import React, { useState } from 'react';
import { fetchTeamRadio } from '../services/api';

const TeamRadio = ({ sessionKey }) => {
  const [driverNumber, setDriverNumber] = useState('');
  const [radioData, setRadioData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchRadioData = async () => {
    if (!driverNumber) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchTeamRadio(sessionKey, driverNumber);
      data.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
      setRadioData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 p-4 bg-gradient-to-r from-purple-900 via-fuchsia-900 to-pink-900  rounded shadow w-full">
      <h1 className="text-2xl font-bold mb-4 text-center font-sans">Latest Team Radio</h1>

      <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          value={driverNumber}
          onChange={(e) => setDriverNumber(e.target.value)}
          placeholder="Enter Driver Number"
          className="px-3 py-2 mr-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleFetchRadioData}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
        >
          Fetch Radio Data
        </button>
      </div>

      {loading && <p class="text-black text-2xl flex items-center justify-center h-full mt-32 ">Loading...</p>}
      {error && <p class="text-black text-2xl flex items-center justify-center h-full mt-32 ">Error: {error}</p>}

      <div className="grid grid-cols-1 gap-4">
        {radioData.length > 0 ? (
          radioData.map((radio, index) => (
            <div key={index} className="p-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">{new Date(radio.date).toLocaleString()}</h2>
              <audio controls src={radio.recording_url} className="w-full" />
              {/* <p><strong>Meeting Key:</strong> {radio.meeting_key}</p>
              <p><strong>Session Key:</strong> {radio.session_key}</p> */}
            </div>
          ))
        ) : (
          <p>No team radio data available for this driver.</p>
        )}
      </div>
    </div>
  );
};

export default TeamRadio;
