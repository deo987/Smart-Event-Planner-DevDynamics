import React, { useEffect, useState } from 'react';
import { getEvents, getSuitability } from '../services/api';

function WeatherDashboard() {
  const [events, setEvents] = useState([]);
  const [scores, setScores] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await getEvents();
      setEvents(res.data);

      const newScores = {};
      for (const event of res.data) {
        try {
          const scoreRes = await getSuitability(event._id);
          newScores[event._id] = scoreRes.data.status;
        } catch (err) {
          newScores[event._id] = 'N/A';
        }
      }
      setScores(newScores);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Weather Dashboard</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Event</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Weather Suitability</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event._id} className="text-center">
              <td className="p-2 border">{event.name}</td>
              <td className="p-2 border">{event.date}</td>
              <td className="p-2 border">{event.location}</td>
              <td className="p-2 border">{scores[event._id]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeatherDashboard;