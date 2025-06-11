import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { checkWeather, getSuitability, getAlternatives } from '../services/api';

function EventDetails() {
  const { id } = useParams();
  const [score, setScore] = useState(null);
  const [weather, setWeather] = useState(null);
  const [alternative, setAlternative] = useState(null);

  const fetchWeather = async () => {
    const res = await checkWeather(id);
    setWeather(res.data.weather);
    setScore(res.data.score);
  };

  const fetchAlternative = async () => {
    const res = await getAlternatives(id);
    setAlternative(res.data);
  };

  useEffect(() => {
    fetchWeather();
    fetchAlternative();
  }, [id]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Event Weather Analysis</h2>
      {weather && (
        <div className="mt-4">
          <p><strong>Condition:</strong> {weather.condition}</p>
          <p><strong>Temperature:</strong> {weather.temp}°C</p>
          <p><strong>Precipitation:</strong> {weather.precipitation}%</p>
          <p><strong>Wind:</strong> {weather.wind} km/h</p>
          <p><strong>Suitability Score:</strong> {score}</p>
        </div>
      )}

      {alternative && (
        <div className="mt-6">
          <h3 className="font-bold">Suggested Better Day:</h3>
          <p><strong>Date:</strong> {alternative.date}</p>
          <p><strong>Score:</strong> {alternative.score}</p>
          <p><strong>Condition:</strong> {alternative.weather.condition}</p>
        </div>
      )}
    </div>
  );
}

export default EventDetails;