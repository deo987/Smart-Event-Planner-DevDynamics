const Event = require('../models/Event');
const WeatherAnalysis = require('../models/WeatherAnalysis');
const { getWeatherForDate } = require('../services/weatherService');
const { getWeatherScore } = require('../utils/weatherScoring');

exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

exports.updateEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ error: 'Event not found' });
  
      // Apply updates
      if (req.body.name) event.name = req.body.name;
      if (req.body.location) event.location = req.body.location;
      if (req.body.date) event.date = req.body.date;
      if (req.body.eventType) event.eventType = req.body.eventType;
  
      await event.save(); // this actually persists the change
      res.json(event);
    } catch (err) {
      console.error('Update error:', err);
      res.status(500).json({ error: 'Failed to update event' });
    }
  };
  
  
exports.checkWeather = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const weather = await getWeatherForDate(event.location, event.date);
    const score = getWeatherScore(event.eventType, weather);

    const analysis = new WeatherAnalysis({
      eventId: event._id,
      score,
      details: weather
    });
    await analysis.save();

    res.json({ score, weather });
  } catch (err) {
    res.status(500).json({ error: 'Weather check failed' });
  }
};

exports.getSuitability = async (req, res) => {
  try {
    const analysis = await WeatherAnalysis.findOne({ eventId: req.params.id });
    if (!analysis) return res.status(404).json({ error: 'No analysis found' });
    let status = 'Poor';
    if (analysis.score >= 75) status = 'Good';
    else if (analysis.score >= 50) status = 'Okay';
    res.json({ score: analysis.score, status });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch suitability' });
  }
};

exports.getAlternatives = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    const originalDate = new Date(event.date);
    let bestDay = null, bestScore = 0;

    for (let i = -2; i <= 2; i++) {
      const altDate = new Date(originalDate);
      altDate.setDate(originalDate.getDate() + i);
      const dateStr = altDate.toISOString().split('T')[0];
      const weather = await getWeatherForDate(event.location, dateStr);
      const score = getWeatherScore(event.eventType, weather);

      if (score > bestScore) {
        bestScore = score;
        bestDay = { date: dateStr, score, weather };
      }
    }

    res.json(bestDay);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get alternatives' });
  }
};

