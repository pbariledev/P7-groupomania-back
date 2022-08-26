const Post = require('../models/Post');

exports.createPost = (req, res, next) => {
  const postObject = (req.body.creatPost_TextZone);
  const userId =  (req.body.userId)
  var today= new Date();
  today.getFullYear();//Get the year as a four digit number (yyyy)
  today.getMonth();//Get the month as a number (0-11)
  today.getDate()

  const post = new Post({
      content: postObject,
      userId: userId,
      timesEdits : today,
  });
  post.save()
  .then(() => res.status(201).json({ message: 'post enregistrée !'}))
  .catch(error => res.status(400).json({message: 'objet non créé !'}));
};

exports.getAllPost =(req, res, next) => {
  Post.find()
  .then(posts => res.status(200).json(posts))
  .catch(error => res.status(400).json({error}));
};

exports.getOnePost = (req,res,next) => {
  Post.findOne({_id: req.params.id})
  .then( sauce => res.status(200).json(sauce))
  .catch(error => res.status(404).json({error}));
};