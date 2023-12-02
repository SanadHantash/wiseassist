const chatbotController = require('../Controllers/chatbotController');
const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/authorization');


router.post('/chatbot/sendmessage',chatbotController.chatbot);


module.exports = router;