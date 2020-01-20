// ====================
// imports
// ====================
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

// ====================
// controller
// ====================
const usersController = require('../controllers/usersController');

// ====================
// requests
// ====================

//////////
// GET
//////////

// get list of users
router.get('/getusers', usersController.testQuery);

// //////////
// // POST
// //////////

// create a new user
router.post('/newuser', usersController.newUser);

// ====================
// exports
// ====================
module.exports = router;