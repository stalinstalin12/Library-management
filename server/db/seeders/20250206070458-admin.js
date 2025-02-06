'use strict';

const bcrypt = require("bcrypt");

module.exports = {
  up: (models, mongoose) => {

      let password = "admin123";
      let salt = bcrypt.genSaltSync(10);
      const hashed_pass = bcrypt.hashSync(password,salt);
    
      return models.users.insertMany([
        {  "name" : "admin",
          "email" : "admin@gmail.com",
          "password" : hashed_pass,
          "user_type" : "67a45e7b7a5cd482f9c5099a"
          
        }
        
      ]).then(res => {
      // Prints "1"
      console.log(res.insertedCount);
    });
  },

  down: (models, mongoose) => {
   
    return models.users.deleteMany({
      _id: "67a45e7b7a5cd482f9c5099a"
    }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  }
};

