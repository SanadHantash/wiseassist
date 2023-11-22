const userprofileController = require('../Controllers/userprofileController');
const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/authorization');



router.get('/profile', middleware.authorize, userprofileController.userinfo);
router.put('/profile/uploadimage', middleware.authorize, userprofileController.profilepicture);
router.post('/coursefreeregister/:id', middleware.authorize, userprofileController.reginfreecourse);
router.post('/coursepaidregister/:id', middleware.authorize, userprofileController.reginpaidcourse);
router.post('/addlesson/:id', middleware.authorize, userprofileController.addlesson);
router.post('/addtowhichlist/:id', middleware.authorize, userprofileController.addtowishlist);
router.get('/mywhitchlist', middleware.authorize, userprofileController.witchlist);
router.put('/mywhitchlist/:id/delete', middleware.authorize, userprofileController.deletefromwitchlist);


module.exports = router;

