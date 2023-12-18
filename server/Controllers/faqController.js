const FAQ = require ('../Models/faqModel');

const addquestion = async (req, res) => {
  try {
      const userID = req.user.userId;
      const { question } = req.body;
      
      try {
          const result = await FAQ.addquestion(userID, question);
          return res.status(201).json({ success: true, message: 'Question added successfully', data: result });
      } catch (err) {
          if (err.message === 'Question already exists for this user') {
              return res.status(400).json({ success: false, error: 'Question already exists for this user' });
          } else {
              throw err;
          }
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


  
  const allansweredquestions = async(req,res)=>{
    try{
      const question = await FAQ.allansweredquestions();


      res.status(200).json(question); 
    }
    catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Error in getting questions' });
    }
  }

  const answer = async (req,res) => {
    try{
          const questionID = req.params.id;
          const answer = await FAQ.answer(questionID);
          res.status(201).json(answer); 
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Error in getting answer' });
    }
  }

module.exports = {
    addquestion,
    allansweredquestions,
    answer
}