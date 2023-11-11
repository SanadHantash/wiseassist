const userController = require('../Controllers/userController');
const express = require('express');
const app = express();
const router = express.Router();
const middleware = require('../middleware/authorization');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/protected', middleware.authorize, userController.cont);

module.exports = router;








