'use strict';


module.exports = {
  up: (models, mongoose) => {
    
      return models.user_types.insertMany([
        {
          _id : "67a45e7b7a5cd482f9c5099a",
          user_type : "admin"
        },
        {
          _id : "67a45e907a5cd482f9c5099b",
          user_type : 'customer'
        }
       
      ]).then(res => {
     
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {
   
    return models.user_types.deleteMany({
      _id: {
        $in: [
          "67a45e7b7a5cd482f9c5099a",
          "67a45e907a5cd482f9c5099b",
        ]
      }
    }).then(res => {
      // Prints "1"
      console.log(res.deletedCount);
      });
  }
};