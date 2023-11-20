const db = require('../config');
const FAQ = {};


FAQ.addquestion = async(userID,question) =>{
        try{
            const result = await db.query('INSERT INTO faq (user_id,question) VALUES ($1, $2) RETURNING *', [userID,question]);
            return result.rows[0];
        }
            catch (err) {
                throw err;
            }
}

FAQ.updatetequestion = async (faqID,userID) => {
    try {

        const result = await db.query('UPDATE faq SET question=$2 WHERE id=$1', [faqID,userID]);
        return result.rows;
        } catch (err) {
        throw err;
        }
};

    
  FAQ.deletequestion = async (faqID) => {
    try {
    
      const result = await db.query('UPDATE faq SET is_deletedq = TRUE  WHERE id = $1', [faqID]);
      return result.rows;
    } catch (err) {
      throw err;
    }
  };

    FAQ.allansweredquestions = async () =>{
    try {
        const result = await db.query('SELECT faq.id, faq.question, users.user_name FROM faq INNER JOIN users ON users.id = faq.user_id WHERE faq.is_deletedq = false AND faq.is_deleteda = false AND faq.answer IS NOT NULL;');
        return  result.rows
        } catch (err) {
        throw err;
        }
    }


module.exports =  FAQ;