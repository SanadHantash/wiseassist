const courseController = require('../Controllers/courseController');
const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/authorization');

router.get('/elderlies/allcourses',courseController.allelderliescourses);
router.get('/elderlies/allworkshops', courseController.allelderliesworkshops);
router.get('/elderlies/detail/:id', courseController.detail);
router.get('/course/:id/allessonsauth', middleware.authorize,courseController.alllesonsauth);

router.get('/course/:id/allessons',courseController.alllesons);

router.get('/course/lesson/:id', courseController.lessonpage);
router.get('/course/:id/getcomments', courseController.getcoursecomments);
router.post('/course/:id/addcomment',middleware.authorize,courseController.addcommenttocourse)



module.exports = router;