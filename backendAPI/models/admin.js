const mongoose = require('mongoose')
const admin_schema=new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true

    },
    password:{
        type: String,
        required: true,
        minlength: 3
    }

})
module.exports = mongoose.model('Admin', admin_schema);