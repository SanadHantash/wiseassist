const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
require('dotenv').config();




function cont(req, res){
    res.status(200).json("you are in");
};

const register = async (req, res) => {
    const { first_name, last_name, user_name, email, password, phonenumber, birthdate } = req.body;
  
   
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(10).required(),
      last_name: Joi.string().alphanum().min(3).max(10).required(),
      user_name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().required(),
      password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#!$%&])[a-zA-Z\d@#!$%&]{8,}$/)
        .required()
        .messages({
          'string.pattern.base':
            'Invalid password format. Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one of @, #, !, $, %, or &.',
        }),
      phonenumber: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.pattern.base': 'Invalid phone number format. Please enter a 10-digit phone number.',
      }),
      birthdate: Joi.string().required(),
    });
  
   
    const { error } = schema.validate({ first_name, last_name, user_name, email, password, phonenumber, birthdate });
  
    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  
    try {
        await User.checkUserExistence(email, user_name, phonenumber);
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.register(first_name, last_name, user_name, email, hashedPassword, phonenumber, birthdate);
      res.status(201).json({ success: true, message: 'User added successfully' });
    } catch (err) {
        console.error(err);
        if (err.message === 'Email already exists' || err.message === 'Username already exists' || err.message === 'Phonenumber already exists') {
          res.status(400).json({ success: false, error: err.message });
        } else {

          res.status(500).json({ success: false, error: 'User registration failed' });
        }
      }
  };
  
  const login = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.login(email);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '4h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ success: true, message: 'Successfully signed in', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


module.exports = {
    register,
    login,
    cont
};

