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

      const { title, detail, description, trainer, start_time,end_time, category_id, audince_id, site } = req.body;
      const imageBuffer = req.file ? req.file.buffer : null;

      const imageUrl = await uploadImageToFirebase(imageBuffer);

      await Dashboard.createcourse(
        title,
        detail,
        description,
        trainer,
        start_time,
        end_time,
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

    const { role } = req.user;

   
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin users are allowed.' });
    }
    
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const searchTerm = req.query.search || ''; 
    const categoryFilter = req.query.category || ''; 
    const isPaidFilter = req.query.isPaid !== undefined ? req.query.isPaid === 'true' : undefined;
    const course = await Dashboard.allcourses(page,pageSize,searchTerm,categoryFilter,isPaidFilter);

  
  
    res.status(200).json(course); 
  } 
  catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Error in getting courses' });
    }
  };


const allworkshops = async (req, res, next) => {

  try {

    const {role } = req.user;

   
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin users are allowed.' });
    }
    
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const searchTerm = req.query.search || ''; 
    const categoryFilter = req.query.category || ''; 
    const isPaidFilter = req.query.isPaid !== undefined ? req.query.isPaid === 'true' : undefined;
    const course = await Dashboard.allworkshops(page,pageSize,searchTerm, categoryFilter, isPaidFilter);

  
  
    res.status(200).json(course); 
  } 
  catch (err) {
      console.error(err);
      res.status(400).json({ success: false, error: 'Error in getting workshops' });
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
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const course = await Dashboard.alllessons(courseID,page,pageSize);

  
  
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

      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const course = await Dashboard.alltechtips(page,pageSize);
  
    
    
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
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const question = await Dashboard.allquestions(page,pageSize);

  
  
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

    const acceptcoursecomment = async(req,res) =>{
      
      try {
        const {role } = req.user;

   
        if (role !== 'admin') {
          return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
        }

        
        const courseID = req.params.id;
        await Dashboard.acceptcoursecomment(courseID);
        res.status(200).json({ success: true ,message:'comment accepted successfully'});
      } 
      
      catch (err) {
        console.error(err);
        res.status(500).json({ success: false ,error:'error accept comment'});
      }
    };


    const acceptlessoncomment = async(req,res) =>{
      
      try {
        const {role } = req.user;

   
        if (role !== 'admin') {
          return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
        }

        
        const lessonID = req.params.id;
        await Dashboard.acceptlessoncomment(lessonID);
        res.status(200).json({ success: true ,message:'comment accepted successfully'});
      } 
      
      catch (err) {
        console.error(err);
        res.status(500).json({ success: false ,error:'error accept comment'});
      }
    };


    const accepttechtipcomment = async(req,res) =>{
      
      try {
        const {role } = req.user;

   
        if (role !== 'admin') {
          return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
        }

        
        const techID = req.params.id;
        await Dashboard.accepttechtipcomment(techID);
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


  const allusers = async(req,res)=>{
    try{
      const {role} = req.user;
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }

      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const searchTerm = req.query.search || ''; 
      const roleFilter = req.query.role || ''; 
      const users = await Dashboard.allusers(page, pageSize,searchTerm,roleFilter);
      return res.status(200).json({succes: true,users})
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  const countusers = async(req,res)=>{
    try{
      const {role} = req.user;
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }
     const count =  await Dashboard.countusers();
      return res.status(200).json({succes: true,count})
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  const countcourses = async(req,res)=>{
    try{
      const {role} = req.user;
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }
     const count =  await Dashboard.countcourses();
      return res.status(200).json({succes: true,count})
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  const countworkshops = async(req,res)=>{
    try{
      const {role} = req.user;
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }
     const count =  await Dashboard.countworkshops();
      return res.status(200).json({succes: true,count})
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  const counttechtips = async(req,res)=>{
    try{
      const {role} = req.user;
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }
     const count =  await Dashboard.counttechtips();
      return res.status(200).json({succes: true,count})
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  const countfaq = async(req,res)=>{
    try{
      const {role} = req.user;
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }
     const count =  await Dashboard.countfaq();
      return res.status(200).json({succes: true,count})
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  const countlessons = async(req,res)=>{
    try{
      const {role} = req.user;
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }
      const courseID = req.params.id
     const count =  await Dashboard.countlessons(courseID);
      return res.status(200).json({succes: true,count})
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  const attendances = async(req,res)=>{
    try{
      const {role} = req.user;
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }
      const courseID = req.params.id
      const attendances =  await Dashboard.attendances(courseID);
       return res.status(200).json({succes: true,attendances})
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  const countattendances = async(req,res)=>{
    try{
      const {role} = req.user;
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }
      const courseID = req.params.id
     const count =  await Dashboard.countattendances(courseID);
      return res.status(200).json({succes: true,count})
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  const topratedcourse = async(req,res)=>{
    try{
      const {role} = req.user;
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }

      const course = await Dashboard.topratedcourse();
      return res.status(200).json({succes: true,course})
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  const topratedworkshop = async(req,res)=>{
    try{
      const {role} = req.user;
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }

      const workshop = await Dashboard.topratedworkshop();
      return res.status(200).json({succes: true,workshop})
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  const topratedlesson = async(req,res)=>{
    try{
      const {role} = req.user;
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }
     
      const lesson = await Dashboard.topratedlesson();
      return res.status(200).json({succes: true,lesson})
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }


  const minratedcourse = async(req,res)=>{
    try{
      const {role} = req.user;
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }

      const course = await Dashboard.minratedcourse();
      return res.status(200).json({succes: true,course})
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  const minratedworkshop = async(req,res)=>{
    try{
      const {role} = req.user;
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }

      const workshop = await Dashboard.minratedworkshop();
      return res.status(200).json({succes: true,workshop})
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
  const minratedlesson = async(req,res)=>{
    try{
      const {role} = req.user;
      if (role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
      }
     
      const lesson = await Dashboard.minratedlesson();
      return res.status(200).json({succes: true,lesson})
    }catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

const mostenrolledcourse = async(req,res)=>{
  try{
    const {role} = req.user;
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    }

    const course = await Dashboard.mostenrolledcourse();
    return res.status(200).json({succes: true,course})
  }catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
const mostenrolledworkshop = async(req,res)=>{
  try{
    const {role} = req.user;
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    }

    const course = await Dashboard.mostenrolledworkshop();
    return res.status(200).json({succes: true,course})
  }catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

const mostviewedvideo = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    }

    const video = await Dashboard.mostviewedvideo();
    return res.status(200).json({ success: true, video });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


const videoviewers = async(req,res)=>{
  try{
    const {role} = req.user;
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    }
    const lessonID = req.params.id
    const viewer = await Dashboard.videoviewers(lessonID);
    return res.status(200).json({succes: true,viewer})
  }catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

const countvideoviewers = async (req,res)=>{
  try{
    const {role} = req.user;
    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    }
    const lessonID = req.params.id
    const count = await Dashboard.countvideoviewers(lessonID);
    return res.status(200).json({succes: true,count})
  }catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}


module.exports = {
    createcourse,
    allcourses,
    allworkshops,
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
    accepttechtipcomment,
    acceptcoursecomment,
    acceptlessoncomment,
    login,
    sendmessagetouser,
    chatbox,
    allusers,
    countusers,
    countcourses,
    countworkshops,
    countlessons,
    attendances,
    countattendances,
    topratedcourse,
    topratedworkshop,
    minratedcourse,
    minratedworkshop,
    mostenrolledcourse,
    mostenrolledworkshop,
    mostviewedvideo,
    topratedlesson,
    minratedlesson,
    videoviewers,
    countvideoviewers,
    counttechtips,
    countfaq
  }