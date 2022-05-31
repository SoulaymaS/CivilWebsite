const mongoose = require('mongoose');
const project_schema = new mongoose.Schema({
    name: String,
    duration: Number,
    state: Boolean //true: completed, false: in progress

});
let Project = mongoose.model('Project', project_schema);
module.exports.Project = Project;