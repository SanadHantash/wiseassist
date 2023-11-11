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

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCXGyymYGCYewwK2pRozT11KYxVnfjLbHM",
//   authDomain: "wiseassist-b8a8a.firebaseapp.com",
//   projectId: "wiseassist-b8a8a",
//   storageBucket: "wiseassist-b8a8a.appspot.com",
//   messagingSenderId: "221654214715",
//   appId: "1:221654214715:web:66d41f14bee8785798541e",
//   measurementId: "G-61YEY3ELES"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

module.exports = {
  query: (text, params) => pool.query(text, params),
};