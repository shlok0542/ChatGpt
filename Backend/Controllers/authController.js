// const userModel = require('../models/userModel');
// const errorResponse = require('../utils/errorResponse');

// // JWT TOKEN
// exports.sendToken = (user, statusCode, res) => {
//     const token = user.getSignedToken(res)
//     res.status(statusCode).json({ success: true, token });
// };

// // Register

// exports.registerController = async(req, res, next) => {
//     try{
//         const {username, email, password} = req.body;
//         // existing user
//         const existingUser = await userModel.findOne({email});
//         if(existingUser){
//             return next(new errorResponse('Email already exists', 400));
//         }
//         const user= await userModel.create({username, email, password});
//         this.sendToken(user, 201, res);
//     }
//     catch(err){
//         console.log(err);
//         next(err);
// }
// }


// // Login
// exports.loginController = async(req, res,next) => {
//     try{
//         const {email, password} = req.body;
//         // validate email & password
//         if(!email || !password){
//             return next(new errorResponse('Please provide email and password', 400));
//         }
//         // check for user
//         const user = await userModel.findOne({email});
//         if(!user){
//             return next(new errorResponse('Invalid credentials', 401));
//         }
//         const isMatch = await user.matchPassword(password);
//         if(!isMatch){
//             return next(new errorResponse('Invalid credentials', 401));
//         }
//         // res
//         this.sendToken(user, 200, res);
//     }
//     catch(err){
//         console.log(err);
//         next(err);
//     }
// }

// // Logout

// exports.logoutController = (req, res) => {
//      res.clearCookie('refreshtoken')
//     return res.status(200).json({
//         success: true,
//         message: "Logged out successfully"})
// }
   