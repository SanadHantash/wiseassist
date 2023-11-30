const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



function cont(req, res){
    res.status(200).json("you are in");
};

const register = async (req, res) => {
  const { first_name, last_name, user_name, email, password, phonenumber} = req.body;

 
  const schema = Joi.object({
    first_name: Joi.string().alphanum().min(3).max(10).required(),
    last_name: Joi.string().alphanum().min(3).max(10).required(),
    user_name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }) 
    .custom((value, helpers) => {
      if (!value.endsWith('@gmail.com')) {
        return helpers.error('any.custom', { message: 'Email must be a Gmail address' });
      }return value;
    }),
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
    //birthdate: Joi.string().required(),
  });

 
  const { error } = schema.validate({ first_name, last_name, user_name, email, password, phonenumber });

  if (error) {
    return res.status(400).json({ success: false, error: error.message });
  }

  try {
      await User.checkUserExistence(email, user_name, phonenumber);
    const hashedPassword = await bcrypt.hash(password, 10);
   const user = await User.register(first_name, last_name, user_name, email, hashedPassword, phonenumber);
   console.log(user);
    const token = jwt.sign({ userId: user.id, email: user.email,username:user.user_name,role:user.role }, process.env.SECRET_KEY, { expiresIn: '4h' });
    res.cookie('token', token);
    console.log(token);
    res.status(201).json({ success: true, message: 'User added successfully',token,user });
  } catch (err) {
      console.error(err);
      if (err.message === 'invalid email' || err.message === 'invalid username' || err.message === 'invalid phonenumber') {
        res.status(400).json({ success: false, error: err.message });
      } else {

        res.status(500).json({ success: false, error: 'User registration failed', });
      }
    }
};

  const login = async (req, res) => {
    const { email,password  } = req.body;
  
    try {
      const user = await User.login(email);
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!user || user.is_deleted || !isPasswordMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
      

      console.log(user.id);
      const token = jwt.sign({ userId: user.id,username:user.user_name, email: user.email,role:user.role }, process.env.SECRET_KEY, { expiresIn: '4h' });
      res.cookie('token', token, { httpOnly: true });
      res.status(200).json({ success: true, message: 'Successfully signed in', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };


const createCheckoutSession = async (req, res) => {
  try {
    const userID = req.user.userId;

    const checkoutObject = {
      payment_method_types: ['card'],
      line_items: [{
        price: "price_1OAyC3JHXfBpbbMklLDZFaTO",
        quantity: 1,
      }],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 7,
      },
    };

  
    const customer = await stripe.customers.create({
      email: req.user.email, 
      name: req.user.username, 
      metadata: {
        userId: userID,
      },
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      success_url: 'https://localhost:3000/success',
      cancel_url: 'https://localhost:3000/cancel',
      line_items: checkoutObject.line_items,
      mode: checkoutObject.mode,
      subscription_data: checkoutObject.subscription_data,
    });

  
    res.json({ id: session.id });
    await User.checkconfirm(userID);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Payment failed' });
  }
};




module.exports = {
    register,
    login,
    cont,
    createCheckoutSession,
    
};

