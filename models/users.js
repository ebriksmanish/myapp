const mongoose = require('mongoose');
let userData = new mongoose.Schema;
userData = {
    username : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    }
};



// const Schema = mongoose.Schema;
// userData = new mongoose.Schema({
//     username : {
//         type : String
//     },
//     email : {
//         type : String
//     },
//     password : {
//         type : String
//     }
// });

// const Schema = mongoose.Schema;
// const userData = new Schema({
//     username : {
//         type : String
//     },
//     email : {
//         type : String
//     },
//     password : {
//         type : String
//     }
// });

module.exports = mongoose.model('users', userData);

// const users = module.exports = mongoose.model('users', userData);