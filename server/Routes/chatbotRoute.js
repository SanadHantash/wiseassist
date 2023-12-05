

const express = require('express');
const router = express.Router();
const chatbotController = require('../Controllers/chatbotController');

router.post('/chatbot/test', async (req, res) => {
    let { messages } = req.body;

    if (typeof messages === 'string') {
        messages = [messages];
    }

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ message: 'Invalid input. Please provide an array of messages.' });
    }

    try {
        await chatbotController.trainAndSave();

        const responses = await chatbotController.processMessages(messages);

        res.json({ responses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
});


module.exports = router;
