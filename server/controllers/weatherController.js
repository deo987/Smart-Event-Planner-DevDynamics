const { getWeatherForDate } = require('../services/weatherService');

exports.getWeather = async (req, res) => {
  try {
    const weather = await getWeatherForDate(req.params.location, req.params.date);
    res.json(weather);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
};