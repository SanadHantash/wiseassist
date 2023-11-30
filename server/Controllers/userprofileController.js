const updatepassword = async (req, res) => {
  const schema = Joi.object({
    password: Joi.string()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!$%&])[a-zA-Z\d@#!$%&]{8,}$/)
      .required()
      .messages({
        'string.pattern.base':
          'Invalid password format. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one of @, #, !, $, %, or &.',
      }),
  });

  const { error } = schema.validate({ password: req.body.newpassword });
  if (error) {
    return res.status(400).json({ success: false, error: error.message });
  }

  try {
    const userID = req.user.userId;
    const { oldpassword, newpassword } = req.body;


    const user = await User.login(req.user.email);


    const isPasswordMatch = await bcrypt.compare(oldpassword, user.password);
    console.log(user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, error: 'Incorrect old password.' });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);


    await Profile.updatepassword(userID, hashedPassword);

    res.status(200).json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
