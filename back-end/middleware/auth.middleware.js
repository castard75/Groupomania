const jwt = require("jsonwebtoken");
const dbc = require("../config/db");

module.exports = async (req, res, next) => {
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
      const userId = decodedToken.user_id;
      const admin = 33;
      req.auth = { userId };
      req.authentification = { admin };

      console.log(userId + "  req auth");
      const db = dbc.getDB();
      const sql = `SELECT user_id FROM users WHERE user_id = ${idOfUser}`;

      db.query(sql, async (err, result) => {
        if (err) res.status(204).json({ err: "erreur" });
        else {
          next();
        }
      });
    } else {
      res.clearCookie();
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.clearCookie();
    console.log(err);
    res.status(200).json({ message: "Unauthorized" });
  }
};
