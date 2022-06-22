const mongoose = require('mongoose');
const url= process.env.MONGO;
mongoose.connect(url)
    .then(() => console.log('Mongo db is UP'))
    .catch(err => console.log('MongoDB is down, rasion:', err.message))