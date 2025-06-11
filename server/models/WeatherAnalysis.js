const mongoose = require('mongoose');

const weatherAnalysisSchema = new mongoose.Schema({
  eventId: mongoose.Schema.Types.ObjectId,
  score: Number,
  details: Object,
});

module.exports = mongoose.model('WeatherAnalysis', weatherAnalysisSchema);