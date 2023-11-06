// je dois créer le fichier user pour ma route

// 2 obligatoires sur chaque ficher route
const express = require("express");
const router = express.Router();


// récupère mon modèle fichier user pour travailler sur la 
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

// création route pour inscription 
router.post("/signup", (req, res ) => {
    // 1- vérifier si infos (champs)ont bien été données -> si un n'est pas bon, pas d'inscription --> dernière étape de l'exo; j'ai transforme avec la function checkbody 
    if (!checkBody(req.body, ["name", "email", "password"])) {
        res.json({ result: false, error: "missing or empty fields" });
        // tu envoie un bout de code à ton client et tu t'arretes ici donc on utilise le return oour stop éxécution 
        return;
    }
    // 2- vérifier si already registered c©c
    User.findOne ({ email: req.body.email }).then(data => {
        // on va vérifier si l'email n'est pas existant
        if ( data === null ) {
            // on peut l'inscrire car pas dans la bd (enf onctiond es valeurs renvoyées pr l'suer )
            const newUser = new User ({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            // je save cette variable et je mets then pour accéder au nouveau doc enregistré dans la bd collection user
            newUser.save().then(() => {
                res.json ({ result: true });
            });
            // user alreadty in db 
        } else {
            res.json({ result: false, error: "User already exists" })
        }
    });
});



// création route pour connexion. Utilise route post car infos sensibles donc on ne veut pas les voir sur l url, les infos rentrent dans le cors de la requete (on regarde si il peut se connecter ebn fonction info données) 
router.post("/signin", (req, res ) => {
    // check if signin data is valid
    if (!checkBody(req.body, ["email", "password"])){
        res.json({ result: false, error: "Missing or empty fields "});
        return;
    }
    // check is user registered
    // je vais voir dans la collection s'il existe
    User.findOne({ email: req.body.email, password: req.body.password }).then(data => {
          // user is registered si les infos rentrées sont conformes
        if (data) {
            res.json({ result: true});
        // user is not registered (une des deux onfi n'est pas bonne)
        } else {
            res.json({ result: false, error: "User not found"});
        }
    })
});


// obligatoire fin de page sur chaque ficher route
module.exports = router;
