const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
    userId : {type: String, required : true},
    userName : {type: String},
    content : {type: String, required : true, maxlength: 500},
    likes : {type: Number, default: 0},
    timesEdits : {type: String},
    postNumber:{type: String},
    usersLiked : [String],
    imageUrl : {type: String},
    comments: {
        type: [
          {
            commenterId:String,
            commenterPseudo: String,
            text: String,
          }
        ],
      },
});

module.exports = mongoose.model('post', postSchema);