const Profile = require("../Models/userprofileModel");
const Course = require("../Models/courseModel");
const User = require("../Models/userModel");
const multer = require("multer");
const path = require("path");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { admin } = require("../firebase");
const { log } = require("console");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");

const userinfo = async (req, res, next) => {
  try {
    const userID = req.user.userId;
    //const name = req.user.username;
    const username = req.user.username;
    console.log(username);

    const info = await Profile.userinfo(userID);
    // res.status(200).json(info);
    res.status(200).json({ success: true, info });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "Error in getting user info" });
  }
};

const profilepicture = async (req, res) => {
  try {
    const userID = req.user.userId;
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      const imageBuffer = req.file ? req.file.buffer : null;

      const imageUrl = await uploadImageToFirebase(imageBuffer);

      await Profile.profilepicture(userID, imageUrl);
      res
        .status(201)
        .json({ success: true, message: "image added successfully" });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: "image added failed" });
  }
};

const uploadImageToFirebase = async (imageBuffer) => {
  const bucket = admin.storage().bucket();

  const folderPath = "profiles/";

  const uniqueFilename = "profile-" + Date.now() + ".png";

  const filePath = folderPath + uniqueFilename;

  const file = bucket.file(filePath);

  await file.createWriteStream().end(imageBuffer);

  const imageUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

  return imageUrl;
};

const addlesson = async (req, res) => {
  try {
    const lessonID = req.params.id;
    const userID = req.user.userId;
    await Profile.addlesson(userID, lessonID);
    res
      .status(201)
      .json({ success: true, message: "lesson added successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: "lesson added faileds" });
  }
};





const regincourse = async (req, res) => {
  try {
    const courseID = req.params.id;
    const userID = req.user.userId;

    const isEnrolled = await Profile.isenrolled(userID, courseID);
    if (isEnrolled) {
      throw new Error("you are already enrolled");
    }

    const courseDetails = await Course.detail(courseID);
    const is_paid = courseDetails[0].is_paid;
    let seats = courseDetails[0].seats;
    console.log(seats);
    if (seats === 0) {
      throw new Error("Enrollment is not available due to the limited number of seats having expired");
    }

    if (is_paid === "Paid") {
      await Profile.reginpaidcourse(userID, courseID);
      seats -= 1;
      return res.status(201).json({
        success: true,
        message: "Paid course registered successfully",
      });
    } else if (is_paid === "Free") {
      await Profile.reginfreecourse(userID, courseID);
      seats -= 1;
      return res.status(201).json({
        success: true,
        message: "Free course registered successfully",
      });
    } else {
      throw new Error("Invalid value for is_paid parameter");
    }

  } catch (err) {
    console.error(err);
    return res.status(400).json({
      success: false,
      error: err.message || "Course registration failed",
    });
  }
};

const getregisteredcourses = async (req, res, next) => {
  try {
    const userID = req.user.userId;
    const courses = await Profile.getregisteredcourses(userID);
    res.status(200).json({ success: true, courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Error in getting courses" });
  }
};

const getregisteredworkshops = async (req, res, next) => {
  try {
    const userID = req.user.userId;
    const courses = await Profile.getregisteredworkshops(userID);
    res.status(200).json({ success: true, courses });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "Error in getting workshops" });
  }
};



const updateinfo = async (req, res) => {

  const userID = req.user.userId;

  const { first_name, last_name, user_name, email, phonenumber } = req.body;

  const schema = Joi.object({
    first_name: Joi.string().alphanum().min(3).max(10).required(),
    last_name: Joi.string().alphanum().min(3).max(10).required(),
    user_name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .custom((value, helpers) => {
        if (!value.endsWith("@gmail.com")) {
          return helpers.error("any.custom", {
            message: "Email must be a Gmail address",
          });
        }
        return value;
      }),
    phonenumber: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Invalid phone number format. Please enter a 10-digit phone number.",
      }),
  });

  const { error } = schema.validate({
    first_name,
    last_name,
    user_name,
    email,
    phonenumber,
  });

  if (error) {
    return res.status(400).json({ success: false, error: error.message });
  }

  try {
    if (email || user_name || phonenumber) {
      await Profile.checkUserExistence(email, user_name, phonenumber);
    }

    await Profile.updateinfo(
      userID,
      first_name,
      last_name,
      user_name,
      email,
      phonenumber
    );

    res
      .status(201)
      .json({ success: true, message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    if (
      err.message === "invalid email" ||
      err.message === "invalid username" ||
      err.message === "invalid phonenumber"
    ) {
      res.status(400).json({ success: false, error: err.message });
    } else {
      res.status(500).json({ success: false, error: "User updated failed" });
    }
  }
};

const updatepassword = async (req, res) => {
  
  try {
    
    const userID = req.user.userId;
    const email = req.user.email;
    const { oldpassword, newpassword } = req.body;

    const user = await User.login(email);

    if (!user || !user.password) {
      return res
        .status(401)
        .json({ success: false, error: "User or password not found." });
    }

    const isPasswordMatch = await bcrypt.compare(oldpassword, user.password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Incorrect old password." });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    await Profile.updatepassword(userID, hashedPassword);

    res.status(200).json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const unrolled = async (req, res) => {
  try {
    const courseID = req.params.id;
    const userID = req.user.userId;
    await Profile.unrolled(courseID, userID);
    res.status(200).json("unrolled successfuly");
  } catch (error) {
    res.status(400).json({ success: false, error: "unrolled failed" });
  }
};

module.exports = {
  userinfo,
  profilepicture,
  regincourse,
  getregisteredcourses,
  getregisteredworkshops,
  updateinfo,
  updatepassword,
  unrolled,
};
