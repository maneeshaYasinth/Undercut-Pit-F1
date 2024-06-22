import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://api.openf1.org/v1';

const SessionInfo = ({ sessionKey }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/sessions`, {
          params: {
            session_key: sessionKey
          }
        });
        if (response.data && response.data.length > 0) {
          setSession(response.data[0]); // Assuming session_key is unique and returns one session
        } else {
          setError('Session not found');
        }
      } catch (error) {
        setError('Error fetching session data');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionKey]);

  if (loading) return <p>Loading session data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!session) return <p>No session data available</p>;

  return (
    <div className="bg-gradient-to-r from-purple-900 via-fuchsia-900 to-pink-900 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-screen-lg bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-8">
        <h1 className="text-5xl text-gray-400 font-sans mb-4 text-center relative pb-3">
          Session Information
          <span className="absolute w-full h-1 bottom-0 left-0 flex justify-center">
            <span className="bg-gray-400 w-72"></span>
          </span>
        </h1>
        <div className="grid grid-cols-1 gap-4">
          <div className="relative">
            <h2 className="text-xl font-bold mb-2">{session.session_name}</h2>
            <p><strong>Session Type:</strong> {session.session_type}</p>
            <p><strong>Location:</strong> {session.location}</p>
            <p><strong>Date Start:</strong> {new Date(session.date_start).toLocaleString()}</p>
            <p><strong>Date End:</strong> {new Date(session.date_end).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionInfo;
