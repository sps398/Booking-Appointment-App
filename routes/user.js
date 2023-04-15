const userController = require('../controllers/user');
const express = require('express');
const router = express.Router();

// getUsers

router.get('/users', userController.getUsers);

// addUser

router.post('/add-user', userController.postAddUser);

router.post('/update-user', userController.postEditUser);

// deleteUser

router.post('/delete-user/:userId', userController.postDeleteUser);

module.exports = router;