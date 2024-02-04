const db = require("../config");
const jwt = require("jsonwebtoken");
const passport = require("passport");
// require("../Middleware/authorization");
require("../middleware/auth");
const User = require("../Models/userModel");

const google = async (req, res) => {
  const first_name = req.body.given_name;
  const last_name = req.body.family_name;
  const { email, picture, name } = req.body;

  const existUser = await User.findByEmail(email);
  console.log(existUser);
  if (existUser) {
    try {
      const payload = {
        email: existUser.email,
        user_id: existUser.id,
        role: existUser.role,
      };
      const secretKey = process.env.SECRET_KEY;
      const token = jwt.sign(payload, secretKey, { expiresIn: "4h" });

      return res.status(200).json({
        message: "User signed in successfully",
        token: token,
        data: {
          first_name: existUser.first_name,
          last_name: existUser.last_name,
          picture: existUser.image,
          email: existUser.email,
        },
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    // Create the user using the provided data
    const user = await User.createUsersGoogle(
      first_name,
      last_name,
      name,
      email,
      picture
    );
  
    // Create a payload for the JWT token
    const payload = {
      userId: user.id,
      email: user.email,
      username: user.user_name,
      role: user.role,
    };
  
    // Sign the token with your secret key and set an expiration time
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: "4h" });
  
    // Set the token as a cookie in the response
   // res.cookie("token", token);
    res.cookie("token", token, { httpOnly: true });
  
    // Return the token and user data in the response
    return res.status(201).json({
      success: true,
      message: "User added successfully",
      token: token,
      user: user,
    });
  }
};

module.exports = {
  google,
};
// function isLoggedIn(req, res, next) {
//     req.user ? next() : res.sendStatus(401);
//   }

//   exports.getuser = (req, res) => {
//     res.send('<a href="/auth/google">Authenticate with Google</a>');
//   };

//   exports.getauthenticate = passport.authenticate("google", {
//     scope: ["email", "profile"],
//   });

//   exports.callback = passport.authenticate("google", {
//     successRedirect: "/protected",
//     failureRedirect: "/auth/google/failure",
//   });

//   exports.protected =
//     (isLoggedIn,
//     async  (req, res) => {

//       if (req.user) {
//         try {
//           const { displayName, emails, id } = req.user;

//           const user_name = displayName;
//           const email = emails[0].value;
//           const checkEmailQuery = "SELECT * FROM users WHERE email = $1";
//           const emailCheck = await db.query(checkEmailQuery, [email]);

//           if (emailCheck.rows.length > 0) {
//             const payload = {
//               user_name: user_name,
//               email: email,
//               role_id: emailCheck.rows[0].role_id,
//               id: emailCheck.rows[0].id,
//             };

//             const secretKey = process.env.SECRET_KEY;
//             const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
//             res.status(200).json({
//               message: "User logged in successfully",
//               token: token,
//             });
//             // console.log(token)
//           } else {
//             const role_id = "2";

//             const password = "No Access";
//             const phonenumber = "00000000";

//             const query =
//                 "INSERT INTO users (user_name,email,password,phonenumber,role_id) VALUES ($1, $2, $3, $4, $5)";
//                 const values = [
//                 user_name,
//                 email,
//                 password,
//                 phonenumber,
//                 role_id,

//             ];
//             await db.query(query, values);
//             const payload = {
//                 user_name: user_name,
//                 email: email,
//                 role_id: role_id,
//                 id: id,
//             };

//             const secretKey = process.env.SECRET_KEY;
//             const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });
//             res.status(200).json({
//                 logmessage: "User added successfully",
//                 token: token,
//                 displayName: displayName,
//             });
//             console.log(token)
//           }
//         } catch (error) {
//           console.error("Error saving user information to PostgreSQL:", error);
//           res.status(500).send("Internal Server Error");
//         }
//     } else {
//         res.sendStatus(401);
//     }
//     });

//   exports.logout = (req, res) => {
//     req.logout(() => {
//       req.session.destroy((err) => {
//         if (err) {
//           console.error("Error destroying session:", err);
//         }
//         res.send("Goodbye!");
//       });
//     });
//   };

//   exports.fail = (req, res) => {
//     res.send("Failed to authenticate..");
//   };