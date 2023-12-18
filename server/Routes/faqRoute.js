const faqController = require('../Controllers/faqController');
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authorization');


router.post('/faq/addquestion',middleware.authorize,faqController.addquestion);
router.get('/faq/all', faqController.allansweredquestions);
router.get('/faq/:id/answer', faqController.answer);


module.exports = router;