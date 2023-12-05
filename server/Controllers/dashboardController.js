const Dashboard = require('../Models/dashboardModel.js');
const multer  = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { google } = require('googleapis');
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
     await addToGoogleCalendar(title, start_time, end_time, description);
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

async function addToGoogleCalendar(title, startTime, endTime, description) {
  try {
    const credentials = require("../calendar.json");

    const { client_email, private_key } = credentials;
    const auth = new google.auth.JWT({
      email: "firebase-adminsdk-izm56@wiseassist-b8a8a.iam.gserviceaccount.com",
      key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC7ajpoUTBeb62/\nnbQFAp90B6zT0h+jJO5k+deXpPrj1pTPonBIQ6jDgcR5N5KI2pYZXsLy9JtWFH+M\n16FnwzlIpOFKAF8/hbnHcJynwLAOOqo4iwi4tH/de8X9p61VDVkJGn0b4pfi789g\nI6R1hVpP/Un4rCDqpXQsN6MJM/NRhQ6s7vitNCD0vtFPECgpSB3leUpdOCacTPgI\n8aBP43st1D2ODdvLQJOeJdK363/evgzyAoofofQ5spii2mn/9Y6riGD4lUgTmhL1\ndfdD5Sob8utq6bsuz/dOPlufZqOMsvVQs9nVbILmeSyYcjCpzlKLW/6XHkwncnBB\nmdevNGu5AgMBAAECgf9EDYQSnRM94g+VT2PZmI+N8mYvWagN9ZBwhMhkUuPyF4Ox\ntv+j6Jg/Zb+SGeZ7teO1vVMiJZrCMcSfFS2RdVziTqdVLQ1pDjCHhbyyAqXrL3eK\npfG6ICYjUUPI949ZHZ+sTpIKA3MOVJtYrZiU6Uysqayn6i40W3VJGRV6d1gYdo26\n9fRTEG9v59fBGZ026LwWT7luPH4hblmiqel/TTIrFFut7eRGXPOfKcNtFj7AxBIC\nd/klsId7mW4TDB07kItCVOQb2DDrqK0A1g9L5+fYsnlTyJ+8AjjgIGc4gFXojsbi\n71B3ZIuCOvCRVBfCjIur9Hj2fBn1Ilkoob1ANdECgYEA8uyOWpc6L0oITDN6NRGX\nckF1CCZjnfyeAuw7Uy5KuJO633e2thp6JwSqxZ/TEx4QazVOwUjmyWaIIiS7wNH2\nkGeGN/e7L70Vhdp1PnFg/49ibrVjazAJYcyUKPV5a14CT4J/XRtAiekdDu1jyOTA\n7hDNokXdlzSrCdo7KjQ4/1ECgYEAxYDEoINkvw9TLn4Uw0t93OCXMdPMI43gz4WN\nb3TGAw7XUMCFieBEXblojI+6x2Jw1/EmHpRrDA6YSUNRNCuNjM68UyozWHCiWXtb\nbYb+KLTmz/Kp50vdTwbX5x87NP0RrApwD8Kqny9R7kKzivugHYf6267jlcgEosHY\nXFVem+kCgYBxi+LKM0+uFPOl8pXXwl5AuJnkclUz3oVZJmRgcA3bEqpRk9piaiPY\noxTThO4bTH0uL1+ddt7xGqzdEMB1025ldw5EkNX87WvnAgK1ajeFnNbMmppa2rw3\n63EBaCQV7H41/fBca8WR8NV1Sb7PgyUu4cnMZM27xJGB7HClPH270QKBgQCwqrm4\nFzCEU3IF0ZRDCYFBlcjJMnqVhzEEkKNugpcpXxotSrlpFqow6EvkCCF8fssP7s85\nZWvH8jo4trWppBfPT5JYFhSt1Lr0rgqfk7Q/t2oLszZWBp+lNCrmvCIbCRDIwuFw\nx6IWGJ8CMLon5WNZZyx3XB6J+cxjxmACX/7sGQKBgQCC996M80lzwKmsz7ytWAkN\nVF9jqLw8WB1wqaNEYKZ1WclXU+GOCIk9AhMP7jG2SRXR9NQOiIP6x9dMeCjmv3T9\nChBoYvT2/pxrhtqJglHOS6sz0cwv0E0IFbOllMJitUYqxEFxm3yqXXtfLJqYAbyN\nBMd/q3R3mClo6SMkhhYQWg==\n-----END PRIVATE KEY-----\n",
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });
    const calendar = google.calendar({ version: "v3", auth });

    const event = {
      summary: title,
      description: description,
      start: {
        dateTime: new Date(`${startTime}T00:00:00`).toISOString(),
        timeZone: "Jordan Time (GMT+03:00)",
      },
      end: {
        dateTime: new Date(`${endTime}T23:59:59`).toISOString(),
        timeZone: "Jordan Time (GMT+03:00)",
      },
    };

    console.log(event);

    const result = await calendar.events.insert({
      calendarId: process.env.CALENDAR_ID,
      resource: event,
    });

    console.log("Event added to Google Calendar:", result.data);
  } catch (error) {
    console.error("Error adding event to Google Calendar:", error.message);
    throw error;
  }
}

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
    
    const {title,detail,description,trainer,start_time,end_time,category_id,site } = req.body;
    const courseID = req.params.id;
    await Dashboard.updatecourse(courseID, title,detail,description,trainer,start_time,end_time,category_id,site);
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

const uploadlessonimage = async (req,res) =>{
  try {
    const {  role } = req.user;


    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Only admin are allowed.' });
    }
    
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }
      const lessonID = req.params.id;
      const imageBuffer = req.file ? req.file.buffer : null;

      const imageUrl = await uploadImageToFirebase(imageBuffer);
      await Dashboard.uploadlessonimage(
        lessonID,
        imageUrl
      );

      res.status(201).json({ success: true, message: 'image added successfully' });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: 'image added failed' });
  }
}
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

 

    



    const login = async (req, res) => {
      const { email, password } = req.body;
    
      try {
        const user = await Dashboard.login(email);
    
        if (!user) {
          return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    
        const isPasswordMatch = await bcrypt.compare(password, user.password);
    
        if (!isPasswordMatch) {
          return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    
        const { id, role } = user;
    
        if (role !== 'admin') {
          return res.status(401).json({ success: false, message: 'Access denied. Only admins are allowed.' });
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
     const count =  await Dashboard.countlessons();
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
    countfaq,
    uploadlessonimage
  }