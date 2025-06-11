import React, { useState } from 'react';

function EventForm({ onCreate }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    date: '',
    eventType: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({ name: '', location: '', date: '', eventType: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input name="name" placeholder="Event Name" value={formData.name} onChange={handleChange} className="border p-2 mr-2" />
      <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="border p-2 mr-2" />
      <input name="date" type="date" value={formData.date} onChange={handleChange} className="border p-2 mr-2" />
      <input name="eventType" placeholder="Event Type" value={formData.eventType} onChange={handleChange} className="border p-2 mr-2" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Create</button>
    </form>
  );
}

export default EventForm;
