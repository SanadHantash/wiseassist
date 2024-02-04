const FAQ = require ('../Models/faqModel');

  
  const allfaq = async(req,res)=>{
    try{
      const question = await FAQ.allfaq();


      res.status(200).json(question); 
    }
    catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Error in getting faq' });
    }
  }

  const answer = async (req,res) => {
    try{
          const faqID = req.params.id;
          const answer = await FAQ.answer(faqID);
          res.status(201).json(answer); 
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Error in getting answer' });
    }
  }

module.exports = {
    allfaq,
    answer
}