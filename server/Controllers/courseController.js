
const Course = require('../Models/courseModel.js');



const allcourses = async (req, res, next) => {

    try {
      const courses = await Course.allelderliescourses();
      res.status(200).json({ success: true, courses });
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting courses' });
    }
  };
const allworkshops = async (req, res, next) => {

    try {
      const courses = await Course.allelderliesworkshops();
      res.status(200).json({ success: true, courses });
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting workshops' });
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
    
        const is_paid = courseDetails[0].is_paid; 
        if (is_paid === true) { 
          const lessons =  await Course.alllessonspaid(courseID);
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
    const alllesonsauth = async (req, res, userID) => {
      try {
          const courseID = req.params.id;
  
          const courseDetails = await Course.detail(courseID);
  
          const is_paid = courseDetails[0].is_paid;
          if (is_paid === true) {
              const userID = req.user.userId
              const lessons = await Course.alllessonspaidauth(userID, courseID);
              res.status(201).json({ success: true, lessons });
          } else if (is_paid === false) {
              const lessons = await Course.alllessonsfree(courseID);
              res.status(201).json({ success: true, lessons });
          } else {
              throw new Error('Invalid value for is_paid parameter');
          }
      } catch (err) {
          console.error(err);
          res.status(400).json({ success: false, error: err.message || 'Course registration failed' });
      }
  };
  

    const addratetocourse = async (req, res) => {
      const {rate } = req.body;
      const courseID = req.params.id;
      const userID = req.user.userId;
      try {
          await Course.addratetocourse(courseID, userID, rate);
      
          res.status(200).json({ success: true, message: 'your rate added successfully' });
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  };


  const addcommenttocourse = async (req, res) => {
    const { comment } = req.body;
    const courseID = req.params.id;
    const userID = req.user.userId;
    console.log(userID);
    try {
        await Course.addcommenttocourse(courseID, userID, comment);
        res.status(200).json({ success: true, message: 'Your comment added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getcoursecomments = async (req, res) => {
    const courseID = req.params.id;
  try {
    const comments = await Course.getcoursecomments(courseID); 
    res.status(200).json({ success: true, comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error in getting comments' });
  }
};



    const addratetolesson = async (req, res) => {
      const {rate } = req.body;
      const lessonID = req.params.id;
      const userID = req.user.userId;
      try {
          await Course.addratetolesson(lessonID, userID, rate);
      
          res.status(200).json({ success: true, message: 'your rate added successfully' });
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  };


  const addcommenttolesson = async (req, res) => {
    const { comment } = req.body;
    const lessonID = req.params.id;
    const userID = req.user.userId;
    console.log(userID);
    try {
        await Course.addcommenttolesson(lessonID, userID, comment);
        res.status(200).json({ success: true, message: 'Your comment added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getlessoncomments = async (req, res) => {
    const lessonID = req.params.id;
  try {
    const comments = await Course.getlessoncomments(lessonID); 
    res.status(200).json({ success: true, comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error in getting comments' });
  }
};




module.exports = {
    allcourses,
    detail,
    lessonpage,
    allworkshops,
    alllesonsauth,
    alllesons,
    addratetocourse,
    addcommenttocourse,
    getcoursecomments,
    addratetolesson,
    addcommenttolesson,
    getlessoncomments
  };