const db = require('../config');
const jwt = require('jsonwebtoken');
const User = {};

User.checkUserExistence = async (email, user_name, phonenumber) => {
    const checkEmail = await db.query('SELECT * FROM users WHERE email = $1;', [email]);
    const checkUsername = await db.query('SELECT * FROM users WHERE user_name = $1;', [user_name]);
    const checkPhone = await db.query('SELECT * FROM users WHERE phonenumber = $1;', [phonenumber]);

    if (checkEmail.rows.length > 0) {
    throw new Error("invalid email");
    }
    if (checkUsername.rows.length > 0) {
    throw new Error("invalid username");
    }
    if (checkPhone.rows.length > 0) {
    throw new Error("invalid phonenumber");
    }

    return true; 
    };
    User.register= async (first_name,last_name,user_name, email, hashPassword,phonenumber)=>{
    
      try {
      
          const result = await db.query('INSERT INTO users(first_name,last_name,user_name, email, password, phonenumber) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [first_name,last_name,user_name, email, hashPassword,phonenumber]);
          console.log(result);
          return result.rows[0];
          
  

  } catch (err) {
      throw err;
  }
}
User.login = async (email) => {
    try {
      const user = await db.query('SELECT users.id, email,user_name,roles.role, is_deleted FROM users inner join roles on roles.id = users.role_id WHERE email = $1;', [email]);
      if (user.rows[0]) {
        return user.rows[0];
      } else {
        return "Email not found or user is deleted.";
      }
    } catch (error) {
      throw error;
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