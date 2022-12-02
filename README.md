## Description

Repository backend du projet P7-Groupomania

## Installation

### Préparation de l'environnement

créer un fichier ".env" à partir du fichier ".env.info" contenant les informations ci-dessous à completer:
PORT= Port du Back-end
MDB_USERNAME= identifiant mongoDB
MDB_PASSWORD= mot de passe mongoDB
MDB_CLUSTER= cluster mongoDB
ACCESS_TOKEN_SECRET= JsonWebToken

### installation des dépendances

ouvrir un terminal dans le projet et lancer la commande ci-dessous


```bash
$ npm install
```

### Lancement 

```bash
# launch mode
$ npm run start

# watch mode
$ npm run dev
```