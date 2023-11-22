const Profile = require('../Models/userprofileModel');
const Course = require('../Models/courseModel')
const multer  = require('multer');
const path = require('path');


const { admin } = require('../firebase');

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage }).single('image');



const userinfo = async (req, res, next) => {

    try {
        const userID = req.user.userId;
        const info = await Profile.userinfo(userID);
        res.status(200).json(info); 
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting user info' });
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

        await Profile.profilepicture(
        userID,
        imageUrl
        );
        res.status(201).json({ success: true, message: 'image added successfully' });
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'image added failed' });
    }
  };


  const uploadImageToFirebase = async (imageBuffer) => {
    const bucket = admin.storage().bucket(); 
  
  
    const folderPath = 'profiles/';
  
    const uniqueFilename = 'profile-' + Date.now() + '.png'; 
  
   
    const filePath = folderPath + uniqueFilename;
  
    const file = bucket.file(filePath);
  
    await file.createWriteStream().end(imageBuffer);
  
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
  
    return imageUrl;
  };
 
  


  const addlesson = async (req,res) =>{
    try{
      const lessonID = req.params.id;
      const userID = req.user.userId;
      await Profile.addlesson(userID, lessonID)
      res.status(201).json({ success: true, message: 'lesson added successfully' });
    }catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'lesson added faileds' });
    }
  }



  const addtowishlist = async (req, res) => {
    try {
        const userID = req.user.userId;
        const courseID = req.params.id;
        await Profile.addwish(userID, courseID);
        res.status(200).json('Course added to witchlist successfully');
    } catch (error) {
        res.status(400).json({ success: false, error: 'Course added to witchlist failed' });
    }
};

const witchlist = async (req, res) => {
    try{
        const userID = req.user.userId;
        const witchlist = await Profile.getwitchlist(userID);
        res.status(200).json(witchlist);
    } catch(error){
        res.status(500).json(error);
    }
};


const deletefromwitchlist = async (req, res)=>{
  try{
      const whichID = req.params.id;
      const userID = req.user.userId;
     await Profile.deletefromwitchlist(userID,whichID);
      res.status(200).json('witchlist deleted successfuly');
  } catch(error){
    res.status(400).json({ success: false, error: 'witchlist deleted failed' });
  }
};


const regincourse = async (req, res) => {
  try {
    const courseID = req.params.id;
    
    const courseDetails = await Course.detail(courseID);

    if (!courseDetails || courseDetails.length === 0) {
      throw new Error('Course not found');
    }

    const is_paid = courseDetails[0].is_paid; 

    if (is_paid === true) { 
      const userID = req.user.userId;
      await Profile.reginpaidcourse(userID, courseID);
      res.status(201).json({ success: true, message: 'Paid course registered successfully' });
    } else if (is_paid === false) { 
      const userID = req.user.userId;
      await Profile.reginfreecourse(userID, courseID);
      res.status(201).json({ success: true, message: 'Free course registered successfully' });
    } else {
      throw new Error('Invalid value for is_paid parameter');
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err.message || 'Course registration failed' });
  }
};


const getregisteredcourses = async (req, res, next) => {

  try {
    const userID = req.user.userId
    const courses = await Profile.getregisteredcourses(userID);
    res.status(200).json({ success: true, courses });
  } 
  
  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error in getting courses' });
  }
};

const getregisteredworkshops = async (req, res, next) => {

  try {
    const userID = req.user.userId
    const courses = await Profile.getregisteredworkshops(userID);
    res.status(200).json({ success: true, courses });
  } 
  
  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error in getting workshops' });
  }
};

const mywatchedvideos = async (req, res) => {
  try {
    const userID = req.user.userId;
    const lessons = await Profile.mywatchedvideos(userID);
    res.status(200).json({ success: true, lessons });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error in getting videos' });
  }
};


module.exports = {
    userinfo,
    profilepicture,
    addlesson,
    witchlist,
    addtowishlist,
    deletefromwitchlist,
    regincourse,
    getregisteredcourses,
    getregisteredworkshops,
    mywatchedvideos
}