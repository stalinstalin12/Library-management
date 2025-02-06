const mongoose = require('mongoose');
const user_type = require('./usertype');
const users = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    user_type : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user_types"
    } ,
},
{
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
}
);

module.exports = mongoose.model("users", users);