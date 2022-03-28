const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const dbc = require("../config/db");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (email) => {
  return jwt.sign({ email }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};
exports.signup = async (req, res) => {
  //Recuperation du name,email et password de la requête avec la destructuration
  const { firstname, lastname, email, password } = req.body;

  //Generating salt for Hashing 10 tour de l'algorithme
  const salt = await bcrypt.genSalt(8);

  //Mot de passe Hashé
  const hashedPassword = await bcrypt.hash(password, salt);
  const db = dbc.getDB();

  //on regarde dans la base de données quel email est la meme que celle de la requête.On prend la valeur email depuis le formulaire et on le passe dans un tableau
  db.query(
    "SELECT email from users where email = ?",
    [email],
    (err, results) => {
      console.log(results);
      //Cela signifie que si results est plus grand que 0 , ca veut dire que il y a déja l'email dans la database
      if (results.length > 0) {
        return res.status(200).json({ errorEmailMessage: "Déja enregistré" });
      } else {
        //On insert les valeurs du formulaire dans la table users
        db.query(
          "INSERT INTO users SET ?",
          {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: hashedPassword,
            admin: [0],
            active: [1],
          },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.status(201).json({
                message: "Utilisateur crée!",
                result: result.insertId,
              });
            }
            //Si tout est ok on redirige sur la page Login

            //
          }
        );
      }
    }
  );
};

//LOGIN
exports.login = async (req, res) => {
  //const { email, user_password: clearPassword } = req.body;

  const db = dbc.getDB();
  try {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
      `SELECT user_id, first_name, last_name, password  FROM users WHERE email=?`,
      [email],

      async (err, result) => {
        if (err) return res.status(404).json({ err });
        /*Si la longueur du tableau est egale a 0 ca veut dire qu'il y a pas de mail trouvé*/
        if (result.length === 0) {
          console.log("result");
          return res.status(200).json({ errorMail: "Utilisateur inconnue" });
        } else {
          const hashedPassword = result[0].password;
          console.log(result[0].password);

          //recuperation du mot de passe hashé du resultat

          const match = await bcrypt.compareSync(password, hashedPassword);
          if (!match) {
            //res.clearCookie("jwt");
            return res
              .status(200)
              .json({ errorPassword: "Mot de passe incorrect" });
          } else {
            delete result[0].password;
            const { user_id } = result[0];
            console.log(user_id);
            const token = jwt.sign({ user_id }, process.env.TOKEN_SECRET, {
              expiresIn: maxAge,
            });
            res.cookie("jwt", token, {
              sameSite: "none",
              secure: true,
            });

            res.status(200).json({
              user: result[0],
              token: jwt.sign({ userId: user_id }, process.env.TOKEN_SECRET, {
                expiresIn: "24h",
              }),
            });
          }
        }
      }
    );
  } catch {
    console.log(err);
    return res.status(400).json({ err });
  }
};

//Le cookie s'appel jwt , son contenu est vide et le maxAge durera 1 millisecondes pour qu'il disparaisse
exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

exports.desactivateAccount = (req, res) => {
  const userId = req.params.id;
  const sql = `UPDATE users u SET active=0 WHERE u.user_id = ?`;
  const db = dbc.getDB();
  db.query(sql, userId, (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }
    res.clearCookie("jwt");
    res.status(200).json("Compte désactivé");
  });
};
