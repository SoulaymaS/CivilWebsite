const router = require('express').Router();
const { Project } = require('../models/project');

//Create new employee
router.post('/addProject', async(req, res) => {
    let project = new Project(req.body);
    try {
        project = await Project.save();
        return res.send(project)
    } catch (error) {
        res.send(405).send(error.message);
    }
});
router.get('/allProject', async(req, res) => {
    let projects = await Project.find();
    res.send(teamMembers)
})
module.exports = router