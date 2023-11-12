const courseController = require('../Controllers/courseController');
const express = require('express');
const app = express();
const router = express.Router();

router.get('/elderlies/all', courseController.allelderliescourses);
router.get('/elderlies/onsite', courseController.onsiteelderliescourses);
router.get('/elderlies/online', courseController.onlineelderliescourses);
router.get('/elderlies/onsiteworkshop', courseController.onsiteworkshops);
router.get('/elderlies/onlineworkshop', courseController.onlineworkshops);
router.get('/elderlies/detail/:id', courseController.detail);
router.get('/course/alllessons/:id', courseController.alllessons);
router.get('/course/lesson/:id', courseController.lessonpage);


module.exports = router;