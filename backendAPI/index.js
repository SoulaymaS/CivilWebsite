require('dotenv').config();
require('./database/connectToDb');
const express = require('express');
const router_team = require('./routers/teamMembers');
const router_project= require('./routers/projects');
const router_admin= require('./routers/admins');
const router_user= require('./routers/users');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/team/', router_team)
app.use('/api/project/', router_project)
app.use('/api/admin/', router_admin)
app.use('/api/user/', router_user)
app.listen(port)