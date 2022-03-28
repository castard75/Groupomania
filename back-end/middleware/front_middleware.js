const jwt = require("jsonwebtoken");
const dbc = require("../config/db");

module.exports.reqAuth = async (req, res, next) => {
  try {
    //si il y a un cookie jwt
    if (req.cookies.jwt) {
      //on recupere le cookie
      const { jwt: token } = req.cookies;
      //console.log(token);
      //on compare le token dans le cookie avec le token_secret
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

      //le decodedToken contient un user_id que je renomme idOfUser
      const { user_id: idOfUser } = decodedToken;
      //console.log(idOfUser);
      const db = dbc.getDB();
      const sql = `SELECT user_id FROM users WHERE user_id = ${idOfUser}`;

      db.query(sql, async (err, result) => {
        if (err) res.status(200).json({ err: "erreur" });
        else {
          res.status(200).json(result[0].user_id);
          next();
        }
      });
    }
  } catch (err) {
    res.clearCookie();
    console.log(err);
    res.status(200).json({ message: "Unauthorized" });
  }
};
