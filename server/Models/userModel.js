const db = require('../config');
const jwt = require('jsonwebtoken');
const User = {};

User.checkUserExistence = async (email, user_name, phonenumber) => {
    const checkEmail = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
    const checkUsername = await db.query('SELECT * FROM users WHERE user_name = $1;', [user_name]);
    const checkPhone = await db.query('SELECT * FROM users WHERE phonenumber = $1;', [phonenumber]);

    if (checkEmail.rows.length > 0) {
    throw new Error("Email already exists");
    }
    if (checkUsername.rows.length > 0) {
    throw new Error("Username already exists");
    }
    if (checkPhone.rows.length > 0) {
    throw new Error("Phonenumber already exists");
    }

    return true; 
    };
    User.register= async (first_name,last_name,user_name, email, hashPassword,phonenumber,birthdate)=>{
    
        try {
        
            const result = await db.query('INSERT INTO users(first_name,last_name,user_name, email, password, phonenumber,birthdate) VALUES($1, $2, $3, $4, $5, $6,$7)', [first_name,last_name,user_name, email, hashPassword,phonenumber,birthdate]);
            return result.rows;
    

    } catch (err) {
        throw err;
    }
}
User.login = async(email)=>{
    try{
        const user = await db.query(`select * from users where email = $1;`,[email]);
       
        if ( user.rows[0] != null){
            return user.rows[0];
        } else {
            return "email is not found";
        }
    } catch(error){
        return error;
    }
};


User.checkconfirm = async (userID) => {
    try {
        const result = await db.query('UPDATE users SET role_id = 1 WHERE id = $1 RETURNING *', [userID]);
        return result[0]; 
      } catch (err) {
        throw err;
      }
};


User.findbyid = async (userID) => {
    try {
      const result = await db.query('SELECT * FROM users WHERE id = $1', [userID]);
      return result[0]; 
    } catch (err) {
      throw err;
    }
  };
module.exports = User;