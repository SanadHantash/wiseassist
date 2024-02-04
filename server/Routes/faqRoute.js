const faqController = require('../Controllers/faqController');
const express = require('express');
const router = express.Router();




router.get('/faq/all',faqController.allfaq);
router.get('/faq/:id/answer', faqController.answer);

module.exports = router;