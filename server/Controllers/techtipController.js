const Techtip = require('../Models/techtipModel.js');
const multer  = require('multer');
const path = require('path');


const { admin } = require('../firebase');

const alltechtips = async (req, res, next) => {

try {
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

    module.exports = {
        alltechtips,
        techtipdetail
    }