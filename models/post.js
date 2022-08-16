const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
    userId : {type: String, required : true},
    userName : {type: String, required : true},
    content : {type: Text, required : true},
    likes : {type: Number, default: 0},
    usersLiked : [String],
});

module.exports = mongoose.model('post', postSchema);