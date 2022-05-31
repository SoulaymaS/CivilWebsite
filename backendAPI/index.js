require('./database/connectToDb')
const express = require('express');
const { TeamMember } = require('./models/teamMember');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/team', TeamMember)
app.listen(port)