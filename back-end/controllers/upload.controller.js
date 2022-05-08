const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const dbc = require("../config/db");
const db = dbc.getDB();

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType != "image/jpg" &&
      req.file.detectedMimeType != "image/png" &&
      req.file.detectedMimeType != "image/jpeg"
    )
      throw Error("invalid file");

    if (req.file.size > 500000) throw Error("max size");
  } catch (err) {
    return res.status(201).json(err);
  }
  const fileName = req.body.name + Date.now() + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(`${__dirname}/../images/${fileName}`)
  );

  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

  const userId = decodedToken.user_id;

  let { file } = req;

  if (file) {
    photoProfil = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  }
  // "./uploads/profil/" + fileName
  if (!file) photoProfil = "NULL";
  id = req.body.user_id;
  const sqlUpdateUser = `UPDATE users SET photo_url = " ${photoProfil}"
   WHERE user_id = ${userId};`;
  db.query(sqlUpdateUser, (err, result) => {
    //console.log(hashedPassword);
    if (err) {
      res.status(200).json({ err: "id non compatible" });
    } else {
      res.status(200).json(result.data);
    }
  });
};

exports.getProfilPicture = (req, res, next) => {
  const { id: user_id } = req.params;
  const sqlGetPicture = `SELECT photo_url FROM users WHERE users.user_id = ${user_id} `;
  db.query(sqlGetPicture, (err, result) => {
    if (err) {
      res.status(200).json({ err: "erreur requête getPictureProfil" });
    } else {
      console.log(result);
      res.status(200).json(result[0]);
    }
  });
};
