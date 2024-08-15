import React, { useEffect, useState } from 'react';
import axios from 'axios';
import newBg from '../assets/newBg.jpg'

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
          setSession(response.data[0]); 
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

  if (loading) return <p class="text-black text-2xl flex items-center justify-center h-full mt-32 ">Loading session data...</p>;
  if (error) return <p class="text-black text-2xl flex items-center justify-center h-full mt-32 ">Error: {error}</p>;
  if (!session) return <p class="text-black text-2xl flex items-center justify-center h-full mt-32 ">No session data available</p>;

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center" style={{ backgroundImage: `url(${newBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full max-w-screen-lg bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-8">
        <h1 className="text-5xl text-gray-400 font-sans mb-4 text-center relative pb-3">
          Latest Session Information
          <span className="absolute w-full h-1 bottom-0 left-0 flex justify-center">
            <span className="bg-gray-400 w-72"></span>
          </span>
        </h1>
        <div className="grid grid-cols-1 gap-4">
          <div className="relative">
            <h2 className="text-2xl font-bold mb-2">{session.session_name}</h2>
            <p><strong>Session Type:</strong> {session.session_type}</p>
            <p><strong>Location:</strong> {session.location}</p>
            <p><strong>Date Start:</strong> {new Date(session.date_start).toLocaleString()}</p>
            <p><strong>Date End:</strong> {new Date(session.date_end).toLocaleString()}</p>
          </div>
        </div>
        <p className='mt-8'>*latest Race results feature will added soon in fiture :)</p>
      </div>
    </div>
    
  );
};

export default SessionInfo;
