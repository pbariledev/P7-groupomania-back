const mongoose = require ('mongoose');
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = mongoose.Schema({
    imageUrl : {type: String},
    userName: {type: String, required : true, unique : true},
    email : {type: String, required : true, unique : true},
    password : {type: String, required : true},
    isAdmin: {type: Boolean},
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);