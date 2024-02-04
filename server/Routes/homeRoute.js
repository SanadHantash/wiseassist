const homeController = require('../Controllers/homeController');
const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/authorization');
router.get('/home/allcourses', homeController.allelderliescourses);
router.get('/home/allworkshops', homeController.allelderliesworkshops);
module.exports = router;