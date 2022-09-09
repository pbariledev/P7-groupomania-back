const User =require ('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const error = require ('../middleware/errormessage')

const dotenv = require("dotenv");
const user = require('../models/user');
dotenv.config();

// Regex de validation
const emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =/^([a-zA-Z0-9]{6,20})$/;
const ProfilPictureDefault = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

//creation d'un user
exports.signup = (req, res, next) => {
    //Si l'adresse mail ne respect pas la forme 
    if (!emailRegex.test(req.body.email)) {
        //Alors un message d'erreur apparait
        return res.status(400).json({ error: "Adresse mail invalide" });
        }
    //Si le mot de passe ne respect pas les Regex 
    if (!passwordRegex.test(req.body.password)) {
        return res.status(400).json({error:"Le mot de passe doit contenir entre 6 et 20 caractères",});
        }
    //vérification user existant
    console.log(req)
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
             .then(() =>  res.status(201).json({message: "utilisateur créé"}))
             .catch(error => res.status(400).json({ error }));
     })
     .catch(error => res.status(500).json({ error }));
   };
     
    })
 }

 //connexion d'un user
 exports.login = (req, res, next)=> {
    User.findOne({email: req.body.email})
    .then (user => {
        if (!user) {
         return res.status(401).json({error: 'Email non trouvé !'})
        } else {
            //Comparaison du mots de passe et du hash en BDD
            bcrypt.compare(req.body.password, user.password)
            .then (valid => {
                if(!valid) {
                    return res.status(401).json({error: 'mot de passe incorrecte !'})
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            `${process.env.ACCESS_TOKEN_SECRET}`,
                            { expiresIn: '24h' }
                        )
                    })
                }
            })
            .catch(error => res.status(500).json({ error }));
        }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.UserProfile = (req, res, next) => {
    const userId = req.params.userId;
  User.findOne({_id: userId})
        .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ error: "Utilisateur non trouvé" });
        }
      })
      .catch((error) =>{console.log(error);
        res.status(404).json({ error: "Une erreur s'est produite !" })}
      );
  };

exports.UserModify = (req, res) => {
    const userId = req.params.userId;
    const newUserName= req.body.userName;
    const newEmail= req.body.email;

    User.updateOne( {_id: userId}, {$set:{userName: newUserName, email:newEmail,}} )
        .then(() => res.status(200).json({ message: 'Utilisateur modifié' }))
        .catch((error) => {console.log(error);
            res.status(400).json({ message: 'Impossible de modifier '})}
        );
}

  exports.deleteUser = (req, res) => {
    const userId = req.params.userId;
    User.deleteOne({_id: userId})
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
        .catch(error => res.status(404).json ({ error }));
};