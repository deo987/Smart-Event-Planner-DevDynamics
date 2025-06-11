const axios = require('axios');
require('dotenv').config();

exports.getWeatherForDate = async (location, date) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
  const response = await axios.get(url);

  const target = new Date(date);
  let bestMatch = response.data.list[0];
  let minDiff = Infinity;

  for (let entry of response.data.list) {
    const entryDate = new Date(entry.dt_txt);
    const diff = Math.abs(target - entryDate);
    if (diff < minDiff) {
      bestMatch = entry;
      minDiff = diff;
    }
  }

  return {
    temp: bestMatch.main.temp,
    precipitation: bestMatch.pop * 100,
    wind: bestMatch.wind.speed,
    condition: bestMatch.weather[0].description
  };
};
