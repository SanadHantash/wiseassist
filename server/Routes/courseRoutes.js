const courseController = require('../Controllers/courseController');
const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/authorization');

router.get('/elderlies/all', courseController.allelderliescourses);
router.get('/elderlies/onsite', courseController.onsiteelderliescourses);
router.get('/elderlies/online', courseController.onlineelderliescourses);
router.get('/elderlies/onsiteworkshop', courseController.onsiteworkshops);
router.get('/elderlies/onlineworkshop', courseController.onlineworkshops);
router.get('/elderlies/detail/:id', courseController.detail);
router.get('/course/alllessonsfree/:id', courseController.alllessonsfree);
router.get('/course/alllessonspaid/:id', middleware.authorize,courseController.alllessonspaid);
router.get('/course/lesson/:id', courseController.lessonpage);


module.exports = router;