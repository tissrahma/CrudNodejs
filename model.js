const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const userSchema = new Schema(
    {
        FirstName:{
            type:String,
         
        },
        LastName:{
            type:String,
          
        },
        Age:{
            type:Number,
          
        },
        Sex:{
            type:String,
            
        },
        Image:{
            type:String,
      
        }

    },
   
);
const User = model('User', userSchema);
module.exports = User;