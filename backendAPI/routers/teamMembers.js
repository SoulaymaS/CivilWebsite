const router = require('express').Router();
const { ModuleResolutionKind } = require('typescript');
const { TeamMember, TeamMember } = require('../models/teamMember');

//Create new employee
router.post('/add', async(req, res) => {
    let teamMember = new TeamMember(req.body);
    try {
        teamMember = await teamMember.save();
        return res.send(teamMember)
    } catch (error) {
        res.send(405).send(error.message);
    }
});
router.get('/all', async(req, res) => {
    let teamMembers = await TeamMember.find();
    res.send(teamMembers)
})
module.exports = router