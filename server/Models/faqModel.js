const db = require('../config');
const FAQ = {};


FAQ.addquestion = async (userID, question) => {
  try {
    
      const existingQuestion = await db.query('SELECT * FROM faq WHERE user_id = $1 AND question = $2', [userID, question]);
      
      if (existingQuestion.rows.length > 0) {
          throw new Error('Question already exists for this user');
      }

      const result = await db.query('INSERT INTO faq (user_id, question) VALUES ($1, $2) RETURNING *', [userID, question]);
      return result.rows[0];
  } catch (err) {
      throw err;
  }
};


FAQ.allansweredquestions = async () => {
  try {
    const result = await db.query(`
      SELECT question, COUNT(*) AS question_count
      FROM faq
      WHERE is_deletedq = false AND is_deleteda = false AND answer IS NOT NULL
      GROUP BY question
      HAVING COUNT(*) > 1;
    `);

    return result.rows;
  } catch (err) {
    throw err;
  }
};


FAQ.answer = async(questionID) => {
    try {
        const result = await db.query('select faq.id,faq.answer from faq where id = $1 and faq.is_deleteda = false',[questionID]);
        return result.rows;
    }catch (err) {
      throw err;
    }
}



module.exports =  FAQ;