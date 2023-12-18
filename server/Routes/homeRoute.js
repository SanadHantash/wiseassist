const homeController = require('../Controllers/homeController');
const express = require('express');
const router = express.Router();
router.get('/home/allcourses', homeController.allcourses);
router.get('/home/allworkshops', homeController.allworkshops);
module.exports = router;