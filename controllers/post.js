const Post = require('../models/Post');
const fs = require('fs')

exports.createPost = (req, res, next) => {
  console.log(req.body)
  const postObject = (req.body.content);
  const userId = (req.body.userId)
  const selectedImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  const today = new Date();
  function pad2(n) { return n < 10 ? '0' + n : n }
  const timesEdits=pad2( today.getDate()) + '/' + pad2(today.getMonth() + 1) + '/' +today.getFullYear().toString() + ' à ' +   pad2( today.getHours() ) +':' + pad2( today.getMinutes() ) 
  const postNumber= today.getFullYear().toString() + pad2(today.getMonth() + 1) + pad2( today.getDate()) + pad2( today.getHours() ) + pad2( today.getMinutes() ) + pad2( today.getSeconds() ) 

  const post = new Post({
      imageContentUrl: selectedImage,
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

  Post.aggregate([
    { "$lookup": {
      "from": "users",
      "localField": "userId",
      "foreignField": "_id",
      "as": "User"
    }}
  ]).sort({postNumber:-1})

  .then(posts => res.status(200).json(posts))
  .catch(error => res.status(400).json({error}));
};

exports.getOnePost =(req, res, next) => {
  const idPost = req.params.idPost;
  Post.findOne({ _id: idPost })
  .then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: "Post non trouvé" });
    }
  })
  .catch((error) =>{console.log(error);
    res.status(500).json({ error: "Une erreur s'est produite !" })}
  );

}

exports.likePost = (req, res, next) => {
  const userId =  req.body.userId
  const idPost =  req.body.idPost
  Post.findOne({ _id: idPost })
    .then(post => {
      if (post.usersLiked.includes(userId)) {
        Post.updateOne( {_id:idPost}, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
          .then(() => {
            Post.findOne({ _id: idPost })
            .then((post)=> res.status(200).json(post))})
          .catch(error => res.status(400).json({ error }))
      }else {  
        Post.updateOne( {_id:idPost}, { $push: { usersLiked: userId }, $inc: { likes: +1 } })
          .then(() => {
            Post.findOne({ _id: idPost })
            .then((post)=> res.status(200).json(post))})
          .catch(error => res.status(400).json({ error }));
      }
    })
    .catch(error => res.status(400).json({ error }));
}

exports.ModifyOnePost =(req, res, next) => {
  const idPost = req.params.idPost;
  const newContent = req.body.content; 
  const newImageContentUrl = (req.file ?
    `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    :"");
  Post.findOne({ _id: idPost })
    .then(post => {
      if(newImageContentUrl !== ""){
        const filenameDelete = post.imageContentUrl.split("/images/")[1];
        fs.unlink(`images/${filenameDelete}`, () => {
          Post.updateOne( {_id: idPost}, {$set:{content: newContent, imageContentUrl: newImageContentUrl}} )
            .then(() => {
              Post.findOne({_id: idPost }).then((postModified)=> res.status(200).json(postModified))
            })
            .catch((error) => {console.log(error);
              res.status(400).json({ message: 'Impossible de modifier '})}
            );
        })
      }else{
        Post.updateOne( {_id: idPost}, {$set:{content: newContent}} )
          .then(() => {
            Post.findOne({_id: idPost }).then((postModified)=> res.status(200).json(postModified))
          })
          .catch((error) => {console.log(error);
            res.status(400).json({ message: 'Impossible de modifier '})}
          );
      }
    })
    .catch((error) =>{console.log(error);
      res.status(500).json({ error: "Une erreur s'est produite !" })}
    );
}

exports.deleteOnePost =(req, res, next) =>{
  const idPost = req.params.idPost;
  Post.findOne({ _id: idPost })
  .then(post => {
    if (post.imageContentUrl) {
      const filenameDelete = post.imageContentUrl.split("/images/")[1];
      fs.unlink(`images/${filenameDelete}`, () => {
        Post.deleteOne({_id: idPost})
        .then(() => res.status(200).json({ message: 'Post supprimé !'}))
        .catch(error => res.status(404).json ({ error }));
      })
    } else {
      Post.deleteOne({_id: idPost})
      .then(() => res.status(200).json({ message: 'Post supprimé !'}))
      .catch(error => res.status(404).json ({ error }));
    }
  }) 
  .catch((error) =>{console.log(error);
    res.status(500).json({ error: "Une erreur s'est produite !" })}
  );

}