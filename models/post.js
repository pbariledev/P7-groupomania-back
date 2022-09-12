const mongoose = require ('mongoose');
var Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
    userId :{type: Schema.Types.ObjectId, ref: 'users'},
    content : {type: String, required : true, maxlength: 500},
    imageContentUrl : {type: String},
    timesEdits : {type: String},
    postNumber:{type: String},
    likes : {type: Number, default: 0},
    usersLiked : [String],
    imageUrl : {type: String},
});

module.exports = mongoose.model('post', postSchema);