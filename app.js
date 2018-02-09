const express = require('express');
const app = express();

// Requiring Mongoose
const mongoose = require('mongoose');

// Requiring Config 
const config = require('./config/database');
// connect mongoose to database
mongoose.connect(config.database);

const db = mongoose.connection;
// checking if mongoose connected to mongo DB 
db.on('connected', function(){
    console.log("we are connected to mongoDB");
});
db.on('Error', function(err){
    console.log("we aren't connected to mongodb");
});

// Requiring Users Schema/Instances from Models 

const userSchema = require('./models/users');

// Requiring Body Parser

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// Requiring Routers

const userRoute = require('./routes/users');

app.get('/', (req, res) => res.send('Hello World!'))

// Users Route

app.use('/users', userRoute);


app.listen(3000, () => console.log('Example app listening on port 3000!'))