const Profile = require('../Models/userprofileModel');
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
 
  
  const reginfreecourse = async (req,res) =>{
    try{
      const courseID = req.params.id;
      const userID = req.user.userId;
      await Profile.reginfreecourse(userID, courseID)
      res.status(201).json({ success: true, message: 'Course registerd successfully' });
    }catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Course registered failed' });
    }
  }
  const reginpaidcourse = async (req,res) =>{
    try{
      const courseID = req.params.id;
      const userID = req.user.userId;
      await Profile.reginpaidcourse(userID, courseID)
      res.status(201).json({ success: true, message: 'Course registerd successfully' });
    }catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Course registered faileds' });
    }
  }

module.exports = {
    userinfo,
    profilepicture,
    reginfreecourse,
    reginpaidcourse
}