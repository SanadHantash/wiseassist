const express = require("express");
const router = express.Router();
const chatbotController = require("../Controllers/chatbotController");
const greetingsByeData = require("../intents/greetings.bye.json");
const greetingsHelloData = require("../intents/greetings.hello.json");
const greetingsFAQData = require("../intents/greetings.faq.json");
const greetingsWiseData = require("../intents/greetings.wise.json");

router.post("/chatbot", async (req, res) => {
  let { messages } = req.body;

  try {
    await chatbotController.trainAndSave();

    const defaultResponse =
      "Thank you for your question our team will contact you soon";

    const responses = [];

    for (const message of messages) {
      const lowerCaseMessage = message.toLowerCase().replace(/\s/g, "");
      const strippedMessage = lowerCaseMessage.replace(/[^\w\s]/gi, "");

      const indexBye = greetingsByeData.questions.findIndex(
        (q) => q.toLowerCase().replace(/\s/g, "") === strippedMessage
      );
      const indexHello = greetingsHelloData.questions.findIndex(
        (q) => q.toLowerCase().replace(/\s/g, "") === strippedMessage
      );
      const indexFAQ = greetingsFAQData.questions.findIndex(
        (q) => q.toLowerCase().replace(/\s/g, "") === strippedMessage
      );
      const indexWise = greetingsWiseData.questions.findIndex(
        (q) => q.toLowerCase().replace(/\s/g, "") === strippedMessage
      );

      let question = message;
        

      if (indexBye !== -1) {
        answer = greetingsByeData.answers[indexBye];
      } else if (indexHello !== -1) {
        answer = greetingsHelloData.answers[indexHello];
      } else if (indexFAQ !== -1) {
        answer = greetingsFAQData.answers[indexFAQ];
      } else if (indexWise !== -1) {
        answer = greetingsWiseData.answers[indexWise];
      }else{
        answer = defaultResponse
      }

      responses.push({ question, answer });
    }

    res.json({ responses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = router;
