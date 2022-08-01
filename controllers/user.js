const User =require ('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const dotenv = require("dotenv");
dotenv.config();

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

 //connexion d'un user
 exports.login = (req, res, next)=> {
    User.findOne({email: req.body.email})
    .then (user => {
        if (!user) {
         return res.status(401).json({error: 'utilisateur non trouvé !'})
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
                            ACCESS_TOKEN_SECRET,
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