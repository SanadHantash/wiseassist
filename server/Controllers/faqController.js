const FAQ = require ('../Models/faqModel');

const addquestion = async(req,res) =>{
    try{
        const userID = req.user.userId;
      const {question} = req.body;
   const result = await FAQ.addquestion(userID,question);
  if (result) {
        return res.status(201).json({ success: true, message: 'question added successfully', data: result });
      } else {
        return res.status(400).json({ success: false, error: 'Failed to add question' });
      }
    }catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
}

const updatetequestion = async(req,res) => {

    try{
      const {question} = req.body;
      const faqID = req.params.id;
      const userID = req.user.userId;
      await FAQ.updatetequestion(faqID,userID);
      res.status(200).json({success:true,message:"question updated successfully"});
  
    }catch{
            res.status(500).json({ success: false, error: 'Error updating question' });
    }
  }

  const deletequestion = async(req,res,next) =>{
    try{
      const faqID = req.params.id;
      await FAQ.deletequestion(faqID);
      res.status(200).json({ success: true, message: 'question deleted successfully' });
    } catch(err){
      console.error(err);
      res.status(400).json({ success: false, error: 'question deleted failed' });
    }
  }

  
  const allansweredquestions = async(req,res,next)=>{
    try{
      const question = await FAQ.allansweredquestions();



      res.status(200).json(question); 
    }
    catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Error in getting questions' });
    }
  }

module.exports = {
    addquestion,
    updatetequestion,
    deletequestion,
    allansweredquestions
}