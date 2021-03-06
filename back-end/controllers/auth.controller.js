const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const dbc = require("../config/db");

const maxAge = 3 * 24 * 60 * 60 * 1000;

exports.signup = async (req, res) => {
  //Recuperation du name,email et password de la requête avec la destructuration
  const { firstname, lastname, email, password } = req.body;

  const salt = await bcrypt.genSalt(8);

  //Mot de passe Hashé
  const hashedPassword = await bcrypt.hash(password, salt);
  const db = dbc.getDB();

  db.query(
    "SELECT email from users where email = ?",
    [email],
    (err, results) => {
      // si results est plus grand que 0  il y a déja l'email dans la database
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
          }
        );
      }
    }
  );
};

//LOGIN
exports.login = async (req, res) => {
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
        console.log(result);
        if (result.length === 0) {
          return res
            .status(200)
            .json({ errorMail: "Email ou Mot de passe inconnue" });
        } else {
          const hashedPassword = result[0].password;
          console.log(result[0].password);

          const match = await bcrypt.compareSync(password, hashedPassword);
          if (!match) {
            return res
              .status(200)
              .json({ errorPassword: "Email ou Mot de passe inconnue" });
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

exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

exports.desactivateAccount = (req, res) => {
  const user_id = req.params.id;
  const sql = `DELETE FROM users WHERE user_id = ?`;
  const db = dbc.getDB();
  db.query(sql, user_id, (err, results) => {
    if (err) {
      throw err;
    }
    //On retire l'information du cookie
    res.clearCookie("jwt");
    res.status(200).json("Compte supprimé");
  });
};
