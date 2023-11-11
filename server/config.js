const { Pool } = require('pg');
require('dotenv').config();
//const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};