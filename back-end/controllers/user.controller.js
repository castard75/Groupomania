const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dbc = require("../config/db");
const db = dbc.getDB();

exports.getAllUsers = async (req, res) => {
  const sqlGetUser = `SELECT * FROM users ;`;
  db.query(sqlGetUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    //on enlève le mdp du resultat
    delete result[0].user_password;
    res.status(200).json(result);
  });
};

exports.getOneUser = (req, res, next) => {
  //je veux chercher id dans le req params et je crée en mm temps une variable userId égale a ID pour aller lutiliser dans ma requête
  //const { id: userId } = req.params;
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  //console.log(decodedToken);
  const userId = decodedToken.user_id;
  const sqlGetUser = `SELECT * FROM users WHERE users.user_id = ${userId};`;
  db.query(sqlGetUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    } else {
      res.status(200).json(result);
    }
  });
};

exports.updateOneUser = async (req, res) => {
  let { file } = req;

  if (file) {
    photoProfil = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

  if (!file) photoProfil = "NULL";

  //Si il n'y a pas de fichier on le supprime
  //if (!file) delete req.body.image_url;

  //On recupere les élement de la requête
  const { bio } = req.body;
  //je recupere l'id en parametre que je nomme userId
  //const { id: userId } = req.params;
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  //console.log(decodedToken);
  const userId = decodedToken.user_id;
  const sqlUpdateUser = `UPDATE users SET Bio = "${bio}"
   WHERE user_id = ${userId};`;
  db.query(sqlUpdateUser, (err, result) => {
    //console.log(hashedPassword);
    if (err) {
      res.status(200).json({ err: "id non compatible" });
    }
    if (result) {
      res.send({ message: "Profil mise à jour" });
    }
  });
};
