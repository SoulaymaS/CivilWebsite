const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user:1234@civildatabase.gqiv9.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Mongo db is UP'))
    .catch(err => console.log('MongoDB is down, rasion:', err.message))