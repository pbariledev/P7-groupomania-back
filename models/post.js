const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
    userId : {type: String, required : true},
    userImageUrl : {type: String},
    userName : {type: String},
    content : {type: String, required : true, maxlength: 500},
    timesEdits : {type: String},
    postNumber:{type: String},
    likes : {type: Number, default: 0},
    usersLiked : [String],
    imageUrl : {type: String},
});

module.exports = mongoose.model('post', postSchema);