import React from 'react';
import { Link } from 'react-router-dom';

function EventList({ events }) {
  return (
    <ul>
      {events.map((event) => (
        <li key={event._id} className="border p-2 mb-2">
          <Link to={`/event/${event._id}`} className="text-blue-600 font-bold">
            {event.name} - {event.date} ({event.location})
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default EventList;
