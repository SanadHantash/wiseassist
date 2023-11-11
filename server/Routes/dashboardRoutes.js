const dashboardController = require('../Controllers/dashboardController');
const express = require('express');
const app = express();
const router = express.Router();
//const middleware = require('../middleware/authorization');


router.post('/dashboard/createcourse', dashboardController.createcourse);
router.get('/dashboard/allcourses', dashboardController.allcourses);
router.get('/dashboard/coursedetail/:id', dashboardController.coursedetail);
router.put('/dashboard/update/:id', dashboardController.updatecourse);
router.put('/dashboard/delete/:id', dashboardController.deletecourse);
router.put('/dashboard/deleteuser/:id', dashboardController.deleteuser);
router.post('/dashboard/createlesson/:id', dashboardController.createlesson);


module.exports = router;








