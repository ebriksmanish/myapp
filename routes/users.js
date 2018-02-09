const express = require('express');
const route = express.Router();

// Requiring Users Schema/Instances from Models 

const userSchema = require('../models/users');


// Making Express ROUTE Points
route.post('/register', function(req, res){
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

module.exports = route;