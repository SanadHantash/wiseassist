const chatController = require('../Controllers/chatController');
const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/authorization');


router.post('/chat/sendmessage',middleware.authorize,chatController.sendmessagetoadmin);
router.get('/chatbox',middleware.authorize, chatController.chatbox);

module.exports = router;