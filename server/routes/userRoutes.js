

const express = require('express');
const userController = require('../controllers/userController');

const { allUser, signup, login, } = userController;
const router = express.Router();

router.get('/', allUser);
router.post('/signup', signup);
router.post('/login', login);



module.exports = router;
