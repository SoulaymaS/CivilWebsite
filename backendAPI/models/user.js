const mongoose= require('mongoose')
//create user schema in mongodb database
const user_schema = new mongoose.Schema({
    //define attributes
    username : {
         type: String,
         required: true,
         minlength:5
    },
    email :{
        type: String,
        required: true,
    },
    password :{
        type: String,
        required: true,
        minlength: 5

    }
});
//export the created model 
let User = mongoose.model('User', user_schema);
module.exports.User= User;