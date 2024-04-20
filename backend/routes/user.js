const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.get('/status', UserController.getUserStatus);
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.delete('/logout', UserController.logoutUser);

module.exports = router;
