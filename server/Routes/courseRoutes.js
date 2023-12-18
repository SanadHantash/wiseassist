const courseController = require('../Controllers/courseController');
const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authorization');

router.get('/elderlies/allcourses',courseController.allcourses);
router.get('/elderlies/allworkshops', courseController.allworkshops);
router.get('/elderlies/detail/:id', courseController.detail);
router.get('/course/:id/allessonsauth', middleware.authorize,courseController.alllesonsauth);
router.get('/course/:id/allessons',courseController.alllesons);
router.get('/course/lesson/:id', courseController.lessonpage);
router.post('/course/:id/addrate', middleware.authorize,courseController.addratetocourse);
router.get('/course/:id/getcomments', middleware.authorize,courseController.getcoursecomments);
router.post('/course/:id/addcomment',middleware.authorize,courseController.addcommenttocourse)
router.post('/lesson/:id/addrate', middleware.authorize,courseController.addratetolesson);
router.get('/lesson/:id/getcomments', middleware.authorize,courseController.getlessoncomments);
router.post('/lesson/:id/addcomment',middleware.authorize,courseController.addcommenttolesson)


module.exports = router;