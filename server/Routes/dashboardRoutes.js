const dashboardController = require('../Controllers/dashboardController');
const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/authorization');


router.post('/dashboard/createcourse',middleware.authorize, dashboardController.createcourse);
router.post('/dashboard/createtichtip', middleware.authorize,dashboardController.createtichtip);
router.get('/dashboard/allcourses', middleware.authorize,dashboardController.allcourses);
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
router.get('/dashboard/lesson/:id', middleware.authorize,dashboardController.lessonpage);
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


module.exports = router;








