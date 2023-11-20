const faqController = require('../Controllers/faqController');
const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/authorization');


router.post('/faq/addquestion',middleware.authorize,faqController.addquestion);
router.put('/faq/updatequestion/:id', middleware.authorize,faqController.updatetequestion);
router.put('/faq/deletequestion/:id', middleware.authorize,faqController.deletequestion);
router.get('/faq/all', middleware.authorize,faqController.allansweredquestions);


module.exports = router;