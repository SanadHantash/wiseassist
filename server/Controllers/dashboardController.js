const Dashboard = require('../Models/dashboardModel.js');
var multer  = require('multer');
const path = require('path');

const admin = require('firebase-admin');
const serviceAccount = require('../privatekey.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'wiseassist-b8a8a.appspot.com', 
});

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage }).single('image');
const videoupload = multer({ storage: storage }).single('video');

const createcourse = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      const { title, detail, description, trainer, course_time, category_id, is_paid, audince_id, site } = req.body;
      const imageBuffer = req.file ? req.file.buffer : null;

      const imageUrl = await uploadImageToFirebase(imageBuffer);

      await Dashboard.createcourse(
        title,
        detail,
        description,
        trainer,
        course_time,
        category_id,
        imageUrl,
        is_paid,
        audince_id,
        site
      );

      res.status(201).json({ success: true, message: 'Course added successfully' });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: 'Course added failed' });
  }
};

const uploadImageToFirebase = async (imageBuffer) => {
  const bucket = admin.storage().bucket(); 


  const folderPath = 'images/';

  const uniqueFilename = 'image-' + Date.now() + '.png'; 

 
  const filePath = folderPath + uniqueFilename;

  const file = bucket.file(filePath);

  await file.createWriteStream().end(imageBuffer);

  const imageUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

  return imageUrl;
};

const allcourses = async (req, res, next) => {

  try {
    const course = await Dashboard.allcourses();

  
  
    res.status(200).json(course); 
  } 
  catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Error in getting courses' });
    }
  };

  const coursedetail = async (req, res) => {
    const courseId = req.params.id;
    try {
      const course = await Dashboard.coursedetail(courseId);
      res.status(200).json({ success: true, course });
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting course' });
    }
  };
  
const updatecourse = async(req,res) => {
 
  try{
   
    const {title,detail,description,trainer,course_time,category_id,site } = req.body;
    const courseID = req.params.id;
    await Dashboard.updatecourse(courseID, title,detail,description,trainer,course_time,category_id,site);
    res.status(200).json({success:true,message:"course updated successfully"});

  }catch{
          res.status(500).json({ success: false, error: 'Error updating course' });
  }
}

const deletecourse = async(req,res,next) =>{
  try{
    const courseID = req.params.id;
    await Dashboard.deletecourse(courseID);
    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch(err){
    console.error(err);
    res.status(400).json({ success: false, error: 'Course deleted failed' });
  }
}

const deleteuser = async (req, res) => {
  try {
    const userID = req.params.id; 
   



    const result = await Dashboard.deleteuser(userID);

    res.status(200).json("user deleted successfully");
  } catch (error) {
    console.error('Error in updateusers controller:', error);
    res.status(500).json({ error: 'Error in updateusers controller' });
  }
};






const createlesson = async (req, res) => {
  try {
    videoupload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      const courseID = req.params.id;
      const videoBuffer = req.file ? req.file.buffer : null;

      const videoUrl = await uploadVideoToFirebase(videoBuffer);
      const result = await Dashboard.createlesson(courseID,videoUrl);

      if (result) {
        return res.status(201).json({ success: true, message: 'Lesson added successfully', data: result });
      } else {
        return res.status(400).json({ success: false, error: 'Failed to add lesson' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
const uploadVideoToFirebase = async (videoBuffer) => {
  const bucket = admin.storage().bucket();
  const folderPath = 'videos/';
  const uniqueFilename = 'video-' + Date.now() + '.mp4';
  const filePath = folderPath + uniqueFilename;

  const file = bucket.file(filePath);
  await file.createWriteStream().end(videoBuffer);

  const videoUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
  return videoUrl;
};

module.exports = {
    createcourse,
    allcourses,
    coursedetail,
    updatecourse,
    deletecourse,
    deleteuser,
    createlesson

}