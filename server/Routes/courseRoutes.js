const courseController = require('../Controllers/courseController');
const express = require('express');
const app = express();
const router = express.Router();

router.get('/elderlies/all', courseController.allelderliescourses);
router.get('/elderlies/onsite', courseController.onsiteelderliescourses);
router.get('/elderlies/online', courseController.onlineelderliescourses);
router.get('/elderlies/coursedetail/:id', courseController.coursedetail);


module.exports = router;