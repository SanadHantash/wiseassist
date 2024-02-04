const Techtip = require('../Models/techtipModel.js');
const multer  = require('multer');
const path = require('path');


const { admin } = require('../firebase');

const alltechtips = async (req, res, next) => {

try {
   // const userID = req.user.userId
    const course = await Techtip.alltechtips();



    res.status(200).json(course); 
} 
catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: 'Error in getting tichtips' });
    }
};

const techtipdetail = async (req, res) => {
    const techId = req.params.id;
    try {
    const course = await Techtip.techtipdetail(techId);
    res.status(200).json({ success: true, course });
    } 
    
    catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error in getting techtip' });
    }
};


const addcomment = async (req, res) => {
    const { comment } = req.body;
    const techtipID = req.params.id;
    const userID = req.user.userId;
    console.log(userID);
    try {
        await Techtip.addcomment(techtipID, userID, comment);
        res.status(200).json({ success: true, message: 'Your comment added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getcomments = async (req, res) => {
    const techID = req.params.id;
  try {
    const comments = await Techtip.getcomments(techID); 
    res.status(200).json({ success: true, comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Error in getting comments' });
  }
};



    module.exports = {
        alltechtips,
        techtipdetail,
        addcomment,
        getcomments
    }