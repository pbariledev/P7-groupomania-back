const User =require ('../models/user')
const bcrypt = require('bcrypt')


//creation d'un user
exports.signup = (req, res, next) => {
    //vérification user existant
    User.findOne({email: req.body.email}).then(userFound => {
     if (userFound){
         return res.status(400).json({ message: 'Un compte avec cette adresse mail existe déjà.' })
     } else {
         bcrypt
         .hash(req.body.password, 10)
         .then((hash) => {
        //creation du user dans la BDD avec photo
        const userToCreate = new User({
            imageUrl: req.body.imageUrl,
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
            isAdmin: false,

         });
         userToCreate.save()
             .then(() =>  res.status(201).json({ message: 'Utilisateur créé !' }))
             .catch(error => res.status(400).json({ error }));
     })
     .catch(error => res.status(500).json({ error }));
   };
     
    })
 }
exports.login =( req, res, next) =>{

};