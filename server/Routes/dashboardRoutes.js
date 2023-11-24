const dashboardController = require('../Controllers/dashboardController');
const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/authorization');


router.post('/dashboard/createcourse',middleware.authorize, dashboardController.createcourse);
router.post('/dashboard/createtichtip', middleware.authorize,dashboardController.createtichtip);
router.get('/dashboard/allcourses', middleware.authorize,dashboardController.allcourses);
router.get('/dashboard/allusers', middleware.authorize,dashboardController.allusers);
router.get('/dashboard/allworkshops', middleware.authorize,dashboardController.allworkshops);
router.get('/dashboard/alltechtips', middleware.authorize,dashboardController.alltechtips);
router.get('/dashboard/coursedetail/:id', middleware.authorize,dashboardController.coursedetail);
router.get('/dashboard/techtipdetail/:id', middleware.authorize,dashboardController.techtipdetail);
router.put('/dashboard/updatecourse/:id', middleware.authorize,dashboardController.updatecourse);
router.put('/dashboard/updatetechtip/:id', middleware.authorize,dashboardController.updatetechtip);
router.put('/dashboard/deletecourse/:id', middleware.authorize,dashboardController.deletecourse);
router.put('/dashboard/deletetechtip/:id', middleware.authorize,dashboardController.deletetechtip);
router.put('/dashboard/deleteuser/:id', middleware.authorize,dashboardController.deleteuser);
router.post('/dashboard/createlesson/:id',middleware.authorize, dashboardController.createlesson);
router.get('/dashboard/alllessons/:id', middleware.authorize,dashboardController.alllessons);
router.get('/dashboard/lesson/:id', middleware.authorize, dashboardController.lessonpage);
router.get('/dashboard/allqeustions', middleware.authorize,dashboardController.allquestions);
router.put('/dashboard/question/:id/addanswer', middleware.authorize,dashboardController.addanswer);
router.put('/dashboard/answer/:id/update', middleware.authorize,dashboardController.updateanswer);
router.put('/dashboard/answer/:id/delete', middleware.authorize,dashboardController.deleteanswer);
router.put('/dashboard/techtip/:id/accepttechtipcomment',middleware.authorize, dashboardController.accepttechtipcomment);
router.put('/dashboard/course/:id/acceptcomment',middleware.authorize, dashboardController.acceptcoursecomment);
router.put('/dashboard/lesson/:id/acceptcomment',middleware.authorize, dashboardController.acceptlessoncomment);
router.get('/dashboard/chatbox/:id',middleware.authorize, dashboardController.chatbox);
router.post('/dashboard/sendmessage/:id',middleware.authorize, dashboardController.sendmessagetouser);
router.post('/dashboard/login', dashboardController.login);
router.get('/dashboard/users/count',middleware.authorize, dashboardController.countusers);
router.get('/dashboard/courses/count',middleware.authorize, dashboardController.countcourses);
router.get('/dashboard/workshops/count',middleware.authorize, dashboardController.countworkshops);
router.get('/dashboard/lessons/count/:id',middleware.authorize, dashboardController.countlessons);
router.get('/dashboard/techtips/count/',middleware.authorize, dashboardController.counttechtips);
router.get('/dashboard/faq/count/',middleware.authorize, dashboardController.countfaq);
router.get('/dashboard/course/:id/attendances/count',middleware.authorize, dashboardController.countattendances);
router.get('/dashboard/course/:id/attendances',middleware.authorize, dashboardController.attendances);
router.get('/dashboard/lesson/:id/viewers',middleware.authorize, dashboardController.videoviewers);
router.get('/dashboard/lesson/:id/viewers/count',middleware.authorize, dashboardController.countvideoviewers);
router.get('/dashboard/course/toprated',middleware.authorize, dashboardController.topratedcourse);
router.get('/dashboard/workshop/toprated',middleware.authorize, dashboardController.topratedworkshop);
router.get('/dashboard/lessons/toprated', middleware.authorize, dashboardController.topratedlesson);
router.get('/dashboard/course/minrated',middleware.authorize, dashboardController.minratedcourse);
router.get('/dashboard/workshop/minrated',middleware.authorize, dashboardController.minratedworkshop);
router.get('/dashboard/lessons/minrated', middleware.authorize, dashboardController.minratedlesson);
router.get('/dashboard/course/mostenrolled',middleware.authorize, dashboardController.mostenrolledcourse);
router.get('/dashboard/workshop/mostenrolled',middleware.authorize, dashboardController.mostenrolledworkshop);
router.get('/dashboard/lessons/mostviewed', middleware.authorize, dashboardController.mostviewedvideo);



module.exports = router;








