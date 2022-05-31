const mongoose = require('mongoose');
const teamMember_schema = new mongoose.Schema({
    name: String,
    surname: String,
    cin: String,
    age: Number,
    position: String, //director/ manager or employee
    experience: String, // Senior/junior
    projects: String
});
let TeamMember = mongoose.model('TeamMember', teamMember_schema);
module.exports.TeamMember = TeamMember;