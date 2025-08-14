// On importe mongoose qui permet de manipuler MongoDB avec des objets JavaScript
const mongoose = require('mongoose');

// On importe le plugin mongoose-unique-validator pour s'assurer que l'email est unique dans la base
const uniqueValidator = require('mongoose-unique-validator');

// Définition du schéma utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Ce plugin améliore les messages d'erreur liés aux champs uniques
// Exemple : il renverra une erreur propre si deux utilisateurs essaient de s’inscrire avec le même email
userSchema.plugin(uniqueValidator);

// On crée et exporte le modèle 'User' basé sur ce schéma
// Cela permet d'utiliser `User.find()`, `new User()`, etc., ailleurs dans ton app
module.exports = mongoose.model('User', userSchema);