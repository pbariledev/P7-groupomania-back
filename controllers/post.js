const Post = require('../models/Post');

exports.createPost = (req, res, next) => {
  const postObject = (req.body.creatPost_TextZone);
  const userId =  (req.body.userId)
  const today = new Date();
  function pad2(n) { return n < 10 ? '0' + n : n }
  const timesEdits=pad2( today.getDate()) + '/' + pad2(today.getMonth() + 1) + '/' +today.getFullYear().toString() + ' à ' +   pad2( today.getHours() ) +':' + pad2( today.getMinutes() ) 
  const postNumber= today.getFullYear().toString() + pad2(today.getMonth() + 1) + pad2( today.getDate()) + pad2( today.getHours() ) + pad2( today.getMinutes() ) + pad2( today.getSeconds() ) 

  const post = new Post({
      content: postObject,
      userId: userId,
      timesEdits : timesEdits,
      postNumber: postNumber
  });
  post.save()
  .then(() => res.status(201).json({ message: 'post enregistrée !'}))
  .catch(error => res.status(400).json({message: 'objet non créé !'}));
};

exports.getAllPost =(req, res, next) => {
  Post.find().sort({postNumber:-1})
  .then(posts => res.status(200).json(posts))
  .catch(error => res.status(400).json({error}));
};

exports.getOnePost = (req,res,next) => {
  Post.findOne({_id: req.params.id})
  .then( post => res.status(200).json(post))
  .catch(error => res.status(404).json({error}));
};