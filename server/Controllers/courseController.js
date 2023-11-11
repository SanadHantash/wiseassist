
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


  const coursedetail = async (req, res) => {
    const courseId = req.params.id;
    try {
      const course = await Course.coursedetail(courseId);
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
  
module.exports = {
    allelderliescourses,
    onsiteelderliescourses,
    onlineelderliescourses,
    coursedetail,
    alllessons,
    lessonpage
  };