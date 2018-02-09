const express = require('express');
const app = express();

// Requiring Mongoose
const mongoose = require('mongoose');
// connect mongoose to database
mongoose.connect('mongodb://localhost/myappDB');

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

app.get('/', (req, res) => res.send('Hello World!'))

// Making Express ROUTE Points
app.post('/register', function(req, res){
    let value = {
        username : req.body.Username,
        email : req.body.Email,
        password : req.body.Password
    };
    userSchema.create(value, function(err, records){
        if(err) return res.json("error")
        else return res.json(records)
    }) 
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))