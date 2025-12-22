const express = require('express');
const { registerController, loginController, logoutController } = require('../Controllers/authController');
 
// router object

const router = express.Router();

//routes 
// register user
router.post('/register',registerController);

// Login 
router.post('/login',loginController);

// logout
router.post('/logout',logoutController);


module.exports= router;
