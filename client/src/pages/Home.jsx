import React, { useEffect, useState } from 'react';
import { createEvent, getEvents } from '../services/api';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import { Link } from 'react-router-dom';

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const res = await getEvents();
    setEvents(res.data);
  };

  const handleCreate = async (eventData) => {
    await createEvent(eventData);
    loadEvents();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-4 text-center">🌤️ Smart Event Planner</h1>
        <EventForm onCreate={handleCreate} />
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">📅 Upcoming Events</h2>
          <EventList events={events} />
        </div>
        <div className="mt-4 text-right">
          <Link to="/weather-dashboard" className="text-indigo-600 hover:underline font-medium">
            → View Weather Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;