const techtipController = require('../Controllers/techtipController');
const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/authorization');

router.get('/alltechtips', techtipController.alltechtips);
router.get('/techtipdetail/:id',  techtipController.techtipdetail);
router.get('/techtip/:id/getcomments', techtipController.getcomments);
router.post('/techtip/:id/addcomment',middleware.authorize,techtipController.addcomment)
module.exports = router;