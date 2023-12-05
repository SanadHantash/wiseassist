const express = require('express');
const router = express.Router();
const chatbotController = require('../Controllers/chatbotController');
const greetingsByeData = require('../intents/greetings.bye.json'); 
const greetingsHelloData = require('../intents/greetings.hello.json'); 

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

        const defaultResponse = 'Default answer for unknown question';

        const responses = messages.map((message) => {
            const indexBye = greetingsByeData.questions.indexOf(message.toLowerCase());
            const indexHello = greetingsHelloData.questions.indexOf(message.toLowerCase());

            if (indexBye !== -1) {
                return greetingsByeData.answers[indexBye];
            } else if (indexHello !== -1) {
                return greetingsHelloData.answers[indexHello];
            } else {
                return defaultResponse;
            }
        });

        res.json({ responses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
});

module.exports = router;
