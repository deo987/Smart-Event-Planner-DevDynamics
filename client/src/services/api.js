import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const createEvent = (data) => API.post('/events', data);
export const getEvents = () => API.get('/events');
export const checkWeather = (id) => API.post(`/events/${id}/weather-check`);
export const getSuitability = (id) => API.get(`/events/${id}/suitability`);
export const getAlternatives = (id) => API.get(`/events/${id}/alternatives`);
