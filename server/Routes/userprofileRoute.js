const userprofileController = require('../Controllers/userprofileController');
const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/authorization');



router.get('/profile', middleware.authorize, userprofileController.userinfo);
router.put('/profile/uploadimage', middleware.authorize, userprofileController.profilepicture);
router.post('/courseregister/:id', middleware.authorize, userprofileController.regincourse);
router.get('/profile/mycourses', middleware.authorize, userprofileController.getregisteredcourses);
router.get('/profile/myworkshops', middleware.authorize, userprofileController.getregisteredworkshops);
router.get('/profile/mywatchedvideos', middleware.authorize, userprofileController.mywatchedvideos);
router.post('/addlesson/:id', middleware.authorize, userprofileController.addlesson);
router.post('/addtowhichlist/:id', middleware.authorize, userprofileController.addtowishlist);
router.get('/mywhitchlist', middleware.authorize, userprofileController.witchlist);
router.put('/mywhitchlist/:id/delete', middleware.authorize, userprofileController.deletefromwitchlist);
router.put('/myprofile/updateinfo', middleware.authorize, userprofileController.updateinfo);
router.put('/myprofile/updatepassword', middleware.authorize, userprofileController.updatepassword);


module.exports = router;

