const db = require('../config');
const jwt = require("jsonwebtoken");
const passport = require("passport");

require("../middleware/auth");





function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }
  
  exports.getuser = (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
  };
  
  exports.getauthenticate = passport.authenticate("google", {
    scope: ["email", "profile"],
  });
  
  exports.callback = passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/google/failure",
  });


  
  
    

  
  
  exports.protected =
    (isLoggedIn,
    async  (req, res) => {
        
      if (req.user) {
        try {
          const { displayName, emails, id } = req.user;
  
          const user_name = displayName;
          const email = emails[0].value;
          const checkEmailQuery = "SELECT * FROM users WHERE email = $1";
          const emailCheck = await db.query(checkEmailQuery, [email]);
  
          if (emailCheck.rows.length > 0) {
            const payload = {
              user_name: user_name,
              email: email,
              role_id: emailCheck.rows[0].role_id,
              id: emailCheck.rows[0].id,
            };
  
            const secretKey = process.env.SECRET_KEY;
            const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
            res.status(200).json({
              message: "User logged in successfully",
              token: token,
            });
           
          } else {
            const role_id = "2";
            
            const password = "No Access";
            const phonenumber = "00000000";
            
            const query =
                "INSERT INTO users (user_name,email,password,phonenumber,role_id) VALUES ($1, $2, $3, $4, $5)";
                const values = [
                user_name,
                email,
                password,
                phonenumber,
                role_id,
                
            ];
            await db.query(query, values);
            const payload = {
                user_name: user_name,
                email: email,
                role_id: role_id,
                id: id,
            };

            const secretKey = process.env.SECRET_KEY;
            const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
            res.status(200).json({
                logmessage: "User added successfully",
                token: token,
                displayName: displayName,
            });
            console.log(token)
          }
        } catch (error) {
          console.error("Error saving user information to PostgreSQL:", error);
          res.status(500).send("Internal Server Error");
        }
    } else {
        res.sendStatus(401);
    }
    });
  
  exports.logout = (req, res) => {
    req.logout(() => {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
        }
        res.send("Goodbye!");
      });
    });
  };
  
  exports.fail = (req, res) => {
    res.send("Failed to authenticate..");
  };
