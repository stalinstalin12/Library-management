const express = require('express');
const router = express.Router();
const userController = require('../controller/userController'); // Ensure correct import

const{set}=require('mongoose');
const accessControl=require('../utils/access-control').accessControl;

function setaccessControl(access_types){
    return(req,res,next)=>{
        accessControl(access_types,req,res,next)
    }
}

// Public Routes
router.post('/register', userController.createUser);


// Protected Routes
router.get('/userProfile', userController.viewUserProfile);
router.put('/updateProfile',  userController.updateUser);

// Admin Routes
router.get('/viewUsers', userController.getAllUsers);
router.get('/singleUser/:id', setaccessControl('1'), userController.getSingleUser);
router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;
