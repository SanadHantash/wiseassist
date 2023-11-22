const Home = require('../Models/homeModel.js');

const allelderliescourses = async (req, res, next) => {

    try {
      const courses = await Home.allelderliescourses();
      res.status(200).json({ success: true, courses });
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting courses' });
    }
  };
const allelderliesworkshops = async (req, res, next) => {

    try {
      const courses = await Home.allelderliesworkshops();
      res.status(200).json({ success: true, courses });
    } 
    
    catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error in getting workshops' });
    }
  };


  module.exports = {
    allelderliescourses,
    allelderliesworkshops
  }