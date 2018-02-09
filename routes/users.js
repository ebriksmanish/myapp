const express = require('express');
const route = express.Router();
// Requiring Bcrypt

const bcrypt = require('bcrypt');

// Requiring Users Schema/Instances from Models 

const userSchema = require('../models/users');



route.post('/register', function(req, res){
    // Making Express ROUTE Points
bcrypt.hash(req.body.Password, 9, function(err, hash) {
    // Store hash in your password DB.
    if(err) return res.json("error in hashing")
    else{ let value = {
            username : req.body.Username,
            email : req.body.Email,
            password : hash
        };
        userSchema.create(value, function(err, records){
            if(err) return res.json("error")
            else return res.json(records)
        })
    }     
  });
});

route.post('/login', function(req, res){
    let value = {
        email : req.body.Email
    };
    userSchema.findOne(value, function(err, records){
        if(err) return res.json("error")
        else {
            bcrypt.compare(req.body.Password, records.password, function(err, result) {
                // res == true
                if(err) return res.json("error in login")
                else return res.json(records)            
            });
        }
        
    })
});

module.exports = route;