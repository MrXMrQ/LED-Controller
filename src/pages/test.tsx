import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [status, setStatus] = useState('');

  const contactBackend = async () => {
    try {
      const response = await axios.get('/api/send');
      const responseData = response.data;
      setStatus(responseData.status);
    } catch (error) {
      setStatus('offline');
    }
  };

  return (
    <div>
      <button onClick={contactBackend}>Contact Backend</button>
      <p>Status: {status}</p>
    </div>
  );
}
