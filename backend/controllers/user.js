// On importe le module bcrypt pour hacher les mots de passe
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

// On importe le modèle User (défini dans models/user.js)
const User = require('../models/user');

// Inscription d'un utilisateur
exports.signup = (req, res, next) => {
    // On hash (chiffre) le mot de passe avec bcrypt, en 10 tours
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // On crée un nouvel utilisateur avec l'e-mail et le mot de passe hashé
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // On sauvegarde l'utilisateur dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur crée !' })) // Succès
                .catch(error => res.status(400).json({ error })); // Erreur de validation ou autre
        })
        .catch(error => res.status(500).json({ error })); // Erreur pendant le hashage
};

// Connexion d'un utilisateur
exports.login = (req, res, next) => {
    // On cherche un utilisateur avec l'email donné
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                // Aucun utilisateur trouvé -> identifiants incorrects
                res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
            } else {
                // Utilisateur trouvé, on compare les mots de passe
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            // Le mot de passe ne correspond pas
                            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' })
                        } else {
                            // Connexion réussie, on renvoie l'id utilisateur + un faux token (à remplacer plus tard)
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => {
                        //Erreur dans la vérification du mot de passe
                        res.status(500).json({ error });
                    })
            }
        })
        .catch(error => {
            // Erreur dans la recherche de l'utilisateur
            res.status(500).json({ error });
        });
};