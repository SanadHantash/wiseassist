const messages = [];
const chatbot = async (req,res) => {
    const message = req.body.message;
  messages.push({
    role: "user",
    content: message,
  });
  const response = openai.createChatCompletion({
    model: "gpt-4",
    messages,
  });
  response
    .then((result) => {
      messages.push({
        role: "assistant",
        content: result.data.choices[0].message.content,
      });
      res.send(result.data.choices[0].message.content);
    })
    .catch((err) => {
      console.log(err);
    });
}


module.exports = {
    chatbot
};
