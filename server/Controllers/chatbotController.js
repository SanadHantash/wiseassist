const { NlpManager } = require("node-nlp");
const fs = require("fs");
const path = require("path");

const manager = new NlpManager({ languages: ["en"] });

const trainAndSave = () => {
    const intentsPath = path.join(__dirname, "../intents");
    
    const files = fs.readdirSync(intentsPath);

    for (const file of files) {
        const filePath = path.join(intentsPath, file);
        const data = fs.readFileSync(filePath);
        const intent = path.basename(file, ".json");

        const { questions, answers } = JSON.parse(data);

        for (const question of questions) {
            manager.addDocument("en", question, intent);
        }

        for (const answer of answers) {
            manager.addAnswer("en", intent, answer);
        }
    }

    return manager.train();
};


const processMessages = async (messages) => {
    await manager.load();
    const responses = [];

    for (const message of messages) {
        const response = await manager.process("en", message);
        responses.push({ question: message, answer: response.answer });
    }

    return responses;
};

module.exports = {
    trainAndSave,
    processMessages,
};
