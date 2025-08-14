// On importe express
const express = require('express');
// On importe mongoose, pour interagir avec MongoDB
const mongoose = require('mongoose');

// On importe les routes "stuff" (ex. : produits, objets) et "user" (inscription/connexion)
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://user_mdb:Poiuytreza@cluster0.v1k5rvj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Création de l'application Express
const app = express();

// Middleware CORS - CORS permet au frontend (sur un autre port) d'accéder à l’API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware pour parser le corps des requêtes JSON. Cela permet d’accéder aux données envoyées dans req.body
app.use(express.json());

// Enregistrement des routes principales
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

// Exportation de l'app. Permet d’importer cette instance dans server.js pour lancer le serveur.
module.exports = app;