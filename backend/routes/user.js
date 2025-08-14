// On importe Express pour créer le routeur
const express = require('express');
// On utilise la méthode Router d'Express pour créer un mini-routeur indépendant
const router = express.Router();
// On importe le contrôleur user
const userCtrl = require('../controllers/user');

// Route POST /api/auth/signup → pour enregistrer un nouvel utilisateur
router.post('/signup', userCtrl.signup);
// Route POST /api/auth/login → pour connecter un utilisateur existant
router.post('/login', userCtrl.login);

// On exporte le routeur pour pouvoir l'utiliser dans app.js
module.exports = router;