const dashboardController = require('../Controllers/dashboardController');
const express = require('express');
const app = express();
const router = express.Router();
//const middleware = require('../middleware/authorization');


router.post('/dashboard/createcourse', dashboardController.createcourse);
router.post('/dashboard/createtichtip', dashboardController.createtichtip);
router.get('/dashboard/allcourses', dashboardController.allcourses);
router.get('/dashboard/alltechtips', dashboardController.alltechtips);
router.get('/dashboard/coursedetail/:id', dashboardController.coursedetail);
router.get('/dashboard/techtipdetail/:id', dashboardController.techtipdetail);
router.put('/dashboard/updatecourse/:id', dashboardController.updatecourse);
router.put('/dashboard/updatetechtip/:id', dashboardController.updatetechtip);
router.put('/dashboard/deletecourse/:id', dashboardController.deletecourse);
router.put('/dashboard/deletetechtip/:id', dashboardController.deletetechtip);
router.put('/dashboard/deleteuser/:id', dashboardController.deleteuser);
router.post('/dashboard/createlesson/:id', dashboardController.createlesson);
router.get('/dashboard/alllessons/:id', dashboardController.alllessons);
router.get('/dashboard/lesson/:id', dashboardController.lessonpage);


module.exports = router;








