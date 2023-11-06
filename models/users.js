// STRUCTURE ET PAGE DE CONNEXION

// --> definir le schema user 
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // les infos que je vais récup 
    name: String,
    email: String,
    password: String,
})

//-->  création sur modèle pour travailer sur la collection user
const User = mongoose.model("users", userSchema);

// --> j'exporte la variable user
module.exports = User