const express = require('express');
const route = express.Router();

// Requiring Users Schema/Instances from Models 

const userSchema = require('../models/users');

// Requiring JsonWebToken

const jwt = require('jsonwebtoken');

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

route.post('/login', function(req, res){
    let value = {
        email : req.body.Email,
        password : req.body.Password
    };
    userSchema.find(value, function(err, records){
        if(err) return res.json("error")
        else {
            let token = jwt.sign({ id: userSchema._id }, "secretkey", { expiresIn: 86400 });
            return res.json({ records : records, token : token})
        }        
    })
});

module.exports = route;