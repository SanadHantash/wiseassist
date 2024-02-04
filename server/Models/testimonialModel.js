const db = require("../config");
const Testimonial = {};

Testimonial.getUserTestimonial = async (userID) => {
  try {
    const result = await db.query('SELECT * FROM testimonials WHERE user_id = $1', [userID]);
    return result.rows[0]; 
  } catch (err) {
    throw err;
  }
};

Testimonial.createtestominal = async (userID, testimonial) => {
  try {
    const result = await db.query(
      `insert into testimonials (user_id,testimonial) values ($1,$2)`,
      [userID, testimonial]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Testimonial.testimonials = async () => {
  try {
    const result = await db.query(
    `select testimonials.id, testimonials.testimonial ,users.user_name from testimonials inner join users on users.id = testimonials.user_id where testimonials.is_deleted = false order by created_at desc limit 5`
    );
    return result.rows;
    } catch (err) {
    throw err;
}
};
module.exports = Testimonial;
