require('./database/connectToDb')
const express = require('express');
const router_team = require('./routers/teamMembers');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/team/', router_team)
app.listen(port)