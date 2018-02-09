const express = require('express');
const route = express.Router();

// Requiring Users Schema/Instances from Models 

const userSchema = require('../models/users');

// Requiring Bcrypt

const bcrypt = require('bcrypt');

// Requiring JsonWebToken

const jwt = require('jsonwebtoken');

// Making Express ROUTE Points
route.post('/register', function(req, res){
    bcrypt.hash(req.body.Password, 9, function(err, hash) {
        // Store hash in your password DB.
        if(err) return res.json("error in hashing")
        else {
            let value = {
                username : req.body.Username,
                email : req.body.Email,
                password : hash
            };
            userSchema.create(value, function(err, records){
                if(err) return res.json("error")
                else return res.json(records)
            }) 
        }
    })
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
                else {
                    let myToken = jwt.sign({ id: userSchema._id }, "secretkey", { expiresIn: 86400 });
                    return res.json({ records : records, token : myToken})
                }
            });
        }        
    })
});

// verifying nothing else
// x-access-token in header and token number , only one parameter
route.get('/me', function(req, res) {
    let myToken = req.headers['x-access-token'];
    if (!myToken) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(myToken, "secretkey", function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      res.status(200).send(decoded);
    });
});

module.exports = route;