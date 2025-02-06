const express = require("express");
const { createBook, getBooks, updateBook, deleteBook } = require("../controller/bookController");
const router = express.Router();
const{set}=require('mongoose');
const accessControl=require('../utils/access-control').accessControl;

function setaccessControl(access_types){
    return(req,res,next)=>{
        accessControl(access_types,req,res,next)
    }
}

// Public Route: Get books with pagination & search
router.get("/viewBooks", getBooks);

// Admin-only routes
router.post("/addBook",setaccessControl('1'),  createBook);
router.put("/updateBook/:id",setaccessControl('1'),  updateBook);
router.delete("/deleteBook/:id",setaccessControl('1'),  deleteBook);

module.exports = router;
