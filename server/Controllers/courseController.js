
const Course = require('../Models/courseModel.js');
//const multer  = require('multer');
const path = require('path');



const allelderliescourses = async (req, res, next) => {

    try {
      const courses = await Course.allelderliescourses();
      res.status(200).json({ success: true, courses });
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting courses' });
    }
  };
const allelderliesworkshops = async (req, res, next) => {

    try {
      const courses = await Course.allelderliesworkshops();
      res.status(200).json({ success: true, courses });
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting workshops' });
    }
  };

  const onsiteelderliescourses = async (req, res, next) => {

    try {
      const courses = await Course.onsiteelderliescourses();
      res.status(200).json({ success: true, courses });
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting courses' });
    }
  };
  const onlineelderliescourses = async (req, res, next) => {

    try {
      const courses = await Course.onlineelderliescourses();
      res.status(200).json({ success: true, courses });
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting courses' });
    }
  };

  
  const  onsiteworkshops = async (req, res, next) => {

    try {
      const courses = await  Course.onsiteworkshops();
      res.status(200).json({ success: true, courses });
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting courses' });
    }
  };

  const  onlineworkshops = async (req, res, next) => {

    try {
      const courses = await  Course.onlineworkshops();
      res.status(200).json({ success: true, courses });
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting courses' });
    }
  };

  const detail = async (req, res) => {
    const courseId = req.params.id;
    try {
      const course = await Course.detail(courseId);
      res.status(200).json({ success: true, course });
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting course' });
    }
  };

  
  
    const lessonpage = async (req, res) => {
      const lessonID = req.params.id;
    
      try {
        const course = await Course.lessonpage(lessonID);
        res.status(200).json({ success: true, course });
      } 
      
      catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error in getting lesson' });
      }
    };
  

    const alllesons = async (req, res) => {
      try {
        const courseID = req.params.id;
        
        const courseDetails = await Course.detail(courseID);
    
        if (!courseDetails || courseDetails.length === 0) {
          throw new Error('Course not found');
        }
    
        const is_paid = courseDetails[0].is_paid; 
    
        if (is_paid === true) { 
          const userID = req.user.userId;
         const lessons =  await Course.alllessonspaid(userID, courseID);
          res.status(201).json({ success: true, lessons });
        } else if (is_paid === false) { 
          const lessons =  await Course.alllessonsfree(courseID);
          res.status(201).json({ success: true, lessons });
        } else {
          throw new Error('Invalid value for is_paid parameter');
        }
      } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, error: err.message || 'Course registration failed' });
      }
    };

module.exports = {
    allelderliescourses,
    onsiteelderliescourses,
    onlineelderliescourses,
    detail,
    lessonpage,
    allelderliesworkshops,
    onsiteworkshops,
    onlineworkshops,
    alllesons
  };