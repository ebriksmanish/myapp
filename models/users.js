const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userData = new Schema({
    username : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    }
});

const users = module.exports = mongoose.model('users', userData);