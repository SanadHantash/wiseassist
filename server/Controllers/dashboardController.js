const Dashboard = require('../Models/dashboardModel.js');
const multer  = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { admin } = require('../firebase');

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage }).single('image');
const videoupload = multer({ storage: storage }).single('video');

const createcourse = async (req, res) => {
  try {
    const {  role } = req.user;

   
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    }
    
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      const { title, detail, description, trainer, course_time, category_id, audince_id, site } = req.body;
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

    const { userId, role } = req.user;

   
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin users are allowed.' });
    }
    
    const course = await Dashboard.allcourses();

  
  
    res.status(200).json(course); 
  } 
  catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Error in getting courses' });
    }
  };

  const coursedetail = async (req, res) => {
    const {  role } = req.user;

   
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    }
    
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
    const {  role } = req.user;

   
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    }
    
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
    const {  role } = req.user;

   
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    }
    
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
    const {role } = req.user;

   
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin users are allowed.' });
    }
    
    const userID = req.params.id; 
   



    await Dashboard.deleteuser(userID);

    res.status(200).json("user deleted successfully");
  } catch (error) {
    console.error('Error in updateusers controller:', error);
    res.status(500).json({ error: 'Error in updateusers controller' });
  }
};

const createlesson = async (req, res) => {
  try {
    const {  role } = req.user;

   
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin users are allowed.' });
    }
    
    videoupload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      const courseID = req.params.id;
      const {title,description} = req.body;
      const videoBuffer = req.file ? req.file.buffer : null;

      const videoUrl = await uploadVideoToFirebase(videoBuffer);
      const result = await Dashboard.createlesson(courseID,videoUrl,title,description);

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


const alllessons = async (req, res, next) => {

  try {
    const { role } = req.user;

   
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    }
    
    const courseID = req.params.id;
    const course = await Dashboard.alllessons(courseID);

  
  
    res.status(200).json(course); 
  } 
  catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Error in getting lessons' });
    }
  };

  const lessonpage = async (req, res) => {
    const {role } = req.user;

   
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    }
    const lessonID = req.params.id;
    try {
   
    
      const course = await Dashboard.lessonpage(lessonID);
      res.status(200).json({ success: true, course });
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting lesson' });
    }
  };

  const createtichtip = async (req,res,next) => {
    try {
      const {role } = req.user;

   
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }
      upload(req, res, async function (err) {
        if (err) {
          return res.status(400).json({ success: false, error: err.message });
        }
  
        const { title, short_detail,detail} = req.body;
        const imageBuffer = req.file ? req.file.buffer : null;
  
        const imageUrl = await uploadImageToFirebase(imageBuffer);
  
        await Dashboard.createtichtip(
          title,
          short_detail,
          detail,
          imageUrl,
        );
  
        res.status(201).json({ success: true, message: 'Techtip added successfully' });
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Tichtip added failed' });
    }
  }
  

  const alltechtips = async (req, res, next) => {

    try {
      const {role } = req.user;

   
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }
      const course = await Dashboard.alltechtips();
  
    
    
      res.status(200).json(course); 
    } 
    catch (err) {
        console.error(err);
        res.status(400).json({ success: false, error: 'Error in getting tichtips' });
      }
    };
  

    const techtipdetail = async (req, res) => {
      const {role } = req.user;

   
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }
      const techId = req.params.id;
      try {
        const course = await Dashboard.techtipdetail(techId);
        res.status(200).json({ success: true, course });
      } 
      
      catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error in getting techtip' });
      }
    };

    const updatetechtip = async(req,res) => {

      try{
        const {role } = req.user;

   
        if (role !== 'admin') {
          return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
        }
        const {title, short_detail,detail} = req.body;
        const techId = req.params.id;
        await Dashboard.updatetechtip(techId,title, short_detail,detail);
        res.status(200).json({success:true,message:"Techtip updated successfully"});
    
      }catch{
              res.status(500).json({ success: false, error: 'Error updating Techtip' });
      }
    }

    const deletetechtip = async(req,res,next) =>{
      try{
        const {role } = req.user;

   
        if (role !== 'admin') {
          return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
        }
        const techId = req.params.id;
        await Dashboard.deletetechtip(techId);
        res.status(200).json({ success: true, message: 'Techtip deleted successfully' });
      } catch(err){
        console.error(err);
        res.status(400).json({ success: false, error: 'Techtip deleted failed' });
      }
    }

    const allquestions = async(req,res,next)=>{
      try{
        const {role } = req.user;

   
        if (role !== 'admin') {
          return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
        }
        const question = await Dashboard.allquestions();

  
  
        res.status(200).json(question); 
      }
      catch (err) {
        console.error(err);
        res.status(400).json({ success: false, error: 'Error in getting questions' });
      }
    }

    const addanswer = async (req, res) => {
      try {
        const {role } = req.user;

   
        if (role !== 'admin') {
          return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
        }
    
          const questionID = req.params.id;
          const {answer} = req.body;

    
          const result = await Dashboard.addanswer(questionID,answer);
    
          if (result) {
            return res.status(201).json({ success: true, message: 'answer added successfully', data: result });
          } else {
            return res.status(400).json({ success: false, error: 'Failed to add answer' });
          }
        
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    };

    const updateanswer = async (req, res) => {
      try {
        
        const {role } = req.user;

   
        if (role !== 'admin') {
          return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
        }
          const answerID = req.params.id;
          const {answer} = req.body;

    
          const result = await Dashboard.addanswer(answerID,answer);
    
          if (result) {
            return res.status(201).json({ success: true, message: 'answer added successfully', data: result });
          } else {
            return res.status(400).json({ success: false, error: 'Failed to add answer' });
          }
        
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
    };

    const deleteanswer = async(req,res) =>{
      try{
        const {role } = req.user;

   
        if (role !== 'admin') {
          return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
        }
        const answerID = req.params.id;
        await Dashboard.deleteanswer(answerID);
        res.status(200).json({ success: true, message: 'Answer deleted successfully' });
      } catch(err){
        console.error(err);
        res.status(400).json({ success: false, error: 'Answer deleted failed' });
      }
    }

    const acceptcomment = async(req,res) =>{
      
      try {
        const {role } = req.user;

   
        if (role !== 'admin') {
          return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
        }
        const techID = req.params.id;
        await Dashboard.acceptcomment(techID);
        res.status(200).json({ success: true ,message:'comment accepted successfully'});
      } 
      
      catch (err) {
        console.error(err);
        res.status(500).json({ success: false ,error:'error accept comment'});
      }
    };

    const login = async (req, res) => {
      const { email } = req.body;
    
      try {
        const user = await Dashboard.login(email);
    
        if (!user || typeof user === 'string') {
          return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    
        const { id, role } = user;
    
        if (role !== 'admin') {
          
          return res.status(401).json({ success: false, message: 'Access denied. Only admin are allowed.' });
        }
    
        const token = jwt.sign({ userId: id, email, role }, process.env.SECRET_KEY, { expiresIn: '4h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ success: true, message: 'Successfully signed in', token });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    };
    

    const getrecivedmessages = async (req,res)=>{
      try{
        const {role } = req.user;


        if (role !== 'admin') {
          return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
        }
        const reciverID = req.user.userId;
        const senderID = req.params.id;

        const messages = await Dashboard.getrecivedmessages(senderID,reciverID);
        res.status(200).json({ success: true, message:messages });
      }catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    }


    const getadmins = async(req,res) =>{
      try{
        await Chat.getadmins();
        
      }catch(err){
          console.error(err);
          res.status(400).json({ success: false, error: 'admins get failed' });
      }
  }
  

    const sendmessagetouser = async(req,res) =>{
      try{
        const {role } = req.user;


        if (role !== 'admin') {
          return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
        }
          const senderID = await Dashboard.getadmins();;
         const reciverID = req.params.id;
          const {message} = req.body;
  
          for (const sendersID of senderID) {
              await Dashboard.sendmessagetouser(sendersID, reciverID, message);
          }
          res.status(201).json({ success: true, message: 'message sent successfully' });
      }catch(err){
          console.error(err);
          res.status(400).json({ success: false, error: 'message sent failed' });
      }
  }

  const getsentmessages = async (req,res)=>{
    try{
      const {role } = req.user;


      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }
      const  senderID = req.user.userId;
      const  reciverID = req.params.id;

      const messages = await Dashboard.getsentmessages(senderID,reciverID);
      res.status(200).json({ success: true, message:messages });
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }



  const chatbox = async(req,res)=>{
      try{
        const {role } = req.user;


        if (role !== 'admin') {
          return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
        }

        const  senderID = req.user.userId;
        const  reciverID = req.params.id;


        const reciver = req.user.userId;
        const sender = req.params.id;
        
        
      const receivedMessages = await Dashboard.getrecivedmessages(sender, reciver);
    const sentMessages = await Dashboard.getsentmessages(senderID, reciverID);
    res.status(200).json({ success: true, receivedMessages, sentMessages });
      }catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
  }

module.exports = {
    createcourse,
    allcourses,
    coursedetail,
    updatecourse,
    deletecourse,
    deleteuser,
    createlesson,
    alllessons,
    lessonpage,
    createtichtip,
    alltechtips,
    techtipdetail,
    updatetechtip,
    deletetechtip,
    allquestions,
    addanswer,
    updateanswer,
    deleteanswer,
    acceptcomment,
    login,
    sendmessagetouser,
    chatbox
}