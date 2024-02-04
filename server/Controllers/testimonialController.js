const Testimonial = require("../Models/testimonialModel");

const createtestominal = async (req, res) => {
  try {
    const userID = req.user.userId;
    const { testimonial } = req.body;

    const existingTestimonial = await Testimonial.getUserTestimonial(userID);

    if (existingTestimonial) {
      res
        .status(409)
        .json({ success: false, error: "User already has a testimonial" });
    } else {
    
      await Testimonial.createtestominal(userID, testimonial);
      res
        .status(200)
        .json({ success: true, message: "Testimonial added successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const testimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.testimonials();
    res.status(200).json({ success: true, testimonials });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ success: false, error: " getting Testimonials failed" });
  }
};
module.exports = {
  createtestominal,
  testimonials,
};
