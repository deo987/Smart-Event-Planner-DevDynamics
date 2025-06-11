const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/', eventController.createEvent);
router.get('/', eventController.getEvents);
router.put('/:id', eventController.updateEvent);
router.post('/:id/weather-check', eventController.checkWeather);
router.get('/:id/suitability', eventController.getSuitability);
router.get('/:id/alternatives', eventController.getAlternatives);

module.exports = router;
