const dashboardController = require("../Controllers/dashboardController");
const express = require("express");
const app = express();
const router = express.Router();
const middleware = require("../middleware/authorization");


router.post("/dashboard/createcourse",middleware.authorize, dashboardController.createcourse);
router.post("/dashboard/createtichtip",middleware.authorize, dashboardController.createtichtip);
router.get("/dashboard/allcourses",middleware.authorize, dashboardController.allcourses);
router.get('/dashboard/coursedetail/:id',middleware.authorize,dashboardController.coursedetail);
router.get("/dashboard/allusers", middleware.authorize,dashboardController.allusers);
router.get("/dashboard/allworkshops",middleware.authorize, dashboardController.allworkshops);
router.get("/dashboard/alltechtips", middleware.authorize,dashboardController.alltechtips);
router.put("/dashboard/updatecourse/:id", middleware.authorize,dashboardController.updatecourse);
router.put("/dashboard/updatetechtip/:id",middleware.authorize, dashboardController.updatetechtip);
router.put("/dashboard/deletecourse/:id", middleware.authorize,dashboardController.deletecourse);
router.put("/dashboard/deletetechtip/:id",middleware.authorize, dashboardController.deletetechtip);
router.put("/dashboard/deleteuser/:id", middleware.authorize,dashboardController.deleteuser);
router.post("/dashboard/createlesson/:id",middleware.authorize, dashboardController.createlesson);

router.get("/dashboard/alllessons/:id", middleware.authorize,dashboardController.alllessons);


router.get("/dashboard/allfaq",middleware.authorize, dashboardController.allfaq);
router.put("/dashboard/faq/:id/update",middleware.authorize, dashboardController.updatefaq);
router.put("/dashboard/faq/:id/delete",middleware.authorize, dashboardController.deletefaq);
router.post("/dashboard/login", dashboardController.login);
router.get("/dashboard/users/count",middleware.authorize, dashboardController.countusers);
router.get("/dashboard/courses/count",middleware.authorize, dashboardController.countcourses);
router.get("/dashboard/workshops/count",middleware.authorize, dashboardController.countworkshops);
router.get("/dashboard/techtips/count",middleware.authorize, dashboardController.counttechtips);

router.get(
  "/dashboard/course/:id/attendances/count",
  middleware.authorize, dashboardController.countattendances
);
router.get(
  "/dashboard/course/:id/attendances",
  middleware.authorize, dashboardController.attendances
);


router.post("/dashboard/addfaq",middleware.authorize,dashboardController.addfaq)
module.exports = router;
