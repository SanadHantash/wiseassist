const db = require('../config');
const FAQ = {};



FAQ.allfaq = async () => {
  try {
    const result = await db.query(`
      SELECT faq.id,faq.question
      FROM faq
      WHERE is_deleted = false 
    `);

    return result.rows;
  } catch (err) {
    throw err;
  }
};


FAQ.answer = async(faqID) => {
    try {
        const result = await db.query('select faq.id,faq.answer from faq where id = $1 and faq.is_deleted= false',[faqID]);
        return result.rows;
    }catch (err) {
      throw err;
    }
}



module.exports =  FAQ;