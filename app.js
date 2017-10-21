const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

// for DB connection using our DB connection  config file
const config = require('./config/database');
mongoose.connect(config.database);
mongoose.connection.on('connected',() => {
    console.log('Connected to database name is '+config.database);
});
// on DB connection error
mongoose.connection.on('error', (err) => {
 console.log('Databse connection error '+ err);
});

const app =express();

const users =require('./routes/users');

// port number
const port = 3000;

//cors middleware
app.use(cors()); // used for cross domain request

//set static public folder for cient side angular app
app.use(express.static(path.join(__dirname,'public')));



// body parser middleware
app.use(bodyParser.json());

//passport middleware for authentication
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users',users);

// index route
app.get('/',(req,res) => {
    res.send('Invalid endpoint');
});

app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
// started server
app.listen(port, () => {
 console.log('Server started at port '+port);
})