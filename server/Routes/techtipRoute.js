const techtipController = require('../Controllers/techtipController');
const express = require('express');
const app = express();
const router = express.Router();


router.get('/alltechtips', techtipController.alltechtips);
router.get('/techtipdetail/:id', techtipController.techtipdetail);
module.exports = router;