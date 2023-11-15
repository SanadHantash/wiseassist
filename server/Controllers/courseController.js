
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

  const alllessonsfree = async (req, res, next) => {

    try {
      const courseID = req.params.id;
      const userID = req.user.userid;
      const course = await Course.alllessonsfree(userID,courseID);
  
    
      res.status(200).json(course); 
    } 
    catch (err) {
        console.error(err);
        res.status(400).json({ success: false, error: 'Error in getting lessons' });
      }
    };
  const alllessonspaid = async (req, res, next) => {

    try {
      const courseID = req.params.id;
      const userID = req.user.userId;
      const course = await Course.alllessonspaid(userID,courseID);
  
    
      res.status(200).json(course); 
    } 
    catch (err) {
        console.error(err);
        res.status(400).json({ success: false, error: 'Error in getting lessons' });
      }
    };
  
    const lessonpage = async (req, res) => {
      const lessonID = req.params.id;
      const userID = req.user.userid;
      try {
        const course = await Course.alllessonspaid(lessonID);
        res.status(200).json({ success: true, course });
      } 
      
      catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Error in getting lesson' });
      }
    };
  
module.exports = {
    allelderliescourses,
    onsiteelderliescourses,
    onlineelderliescourses,
    detail,
    alllessonsfree,
    alllessonspaid,
    lessonpage,
    onsiteworkshops,
    onlineworkshops
  };