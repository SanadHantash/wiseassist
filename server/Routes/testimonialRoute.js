const testimonialController = require('../Controllers/testimonialController');
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authorization');

router.post('/createtestimonial',middleware.authorize,testimonialController.createtestominal);
router.get('/testimonials',testimonialController.testimonials);

module.exports = router;