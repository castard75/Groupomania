const jwt = require("jsonwebtoken");
const dbc = require("../config/db");
const db = dbc.getDB();

const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

exports.createPost = async (req, res, next) => {
  const token = req.cookies.jwt;
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  //console.log(decodedToken);
  const userId = decodedToken.user_id;
  console.log("id " + userId);
  const fileName = userId + Date.now() + ".jpg";
  let { body, file } = req;

  if (file) {
    try {
      await pipeline(
        req.file.stream,
        fs.createWriteStream(`${__dirname}/../images/${fileName}`)
      );

      image_url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    } catch (err) {
      return res.status(201).json(err);
    }
  } else {
    image_url = `no pic`;
  }

  const data = {
    poster_id: req.body.poster_id,
    title: req.body.title,
    post_text: req.body.post_text,
    author_firstname: req.body.author_firstname,
    author_lastname: req.body.author_lastname,
    image_url: image_url,
  };

  if (!file) {
    delete data.image_url;
  }
  db.query("INSERT INTO posts SET ?", [data], (err, result) => {
    if (err) {
      res.status(200).json({ message: err });
      throw err;
    }

    // post_id will be equal to the post inserted, and will be reused to link the image at the correct post in the below query
    else {
      res.status(200).json(result);
    }
  });
};

exports.getAllPost = async (req, res) => {
  const sql =
    //On selectionne le poster_id qui est égal a user_id
    "SELECT * FROM posts , users  WHERE users.active=1 AND posts.poster_id = users.user_id ORDER BY date DESC ";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
    }
    res.status(200).json(result);
  });
};

exports.getOnePost = async (req, res) => {
  const { id: post_id } = req.params;
  //poster_id est egale a l'id de l'utilisateur dans req.param car j'ai fait la jointure entre poster_id et id
  const sql = `SELECT * FROM posts p WHERE p.poster_id = ${post_id};`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
    } else {
      res.status(200).json(result);
    }
  });
};

exports.deleteOnePost = (req, res, next) => {
  const { id: post_id } = req.params;

  db.query(
    "SELECT poster_id FROM posts WHERE id = ?",
    [post_id],
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      if (req.auth.userId == 33) {
        db.query(
          "DELETE FROM posts WHERE posts.id= ?",
          [post_id],
          (err, result) => {
            if (err) {
              res.status(404).json({ err });
              throw err;
            }
            res.status(200).json(result);
          }
        );
      } else if (result[0].poster_id === req.auth.userId) {
        db.query(
          "DELETE FROM posts WHERE posts.id= ?",
          [post_id],
          (err, result) => {
            if (err) {
              res.status(404).json({ err });
              throw err;
            }
            res.status(200).json(result);
          }
        );
      } else {
        res.status(401).json({ error: "Suppression non autorisé" });
      }
    }
  );
};

exports.updatePost = (req, res, next) => {
  const { id: post_id } = req.params;
  const { post_text } = req.body;

  db.query(
    "SELECT * FROM posts JOIN users ON (users.user_id = posts.poster_id) WHERE id=?",
    [post_id],
    (err, result) => {
      console.log(result);

      if (err) {
        res.status(404).json({ err: "erreur" });
        throw err;
      }

      if (req.auth.userId == 33) {
        console.log(req.auth);
        console.log("dacc");

        db.query(
          "UPDATE posts SET post_text = ? WHERE id = ?",
          [post_text, post_id],
          (err, result) => {
            if (err) {
              res.status(404).json({ err });
              throw err;
            }
            res.status(200).json(result);
          }
        );
      } else if (result[0].poster_id === req.auth.userId) {
        db.query(
          "UPDATE posts SET post_text = ? WHERE id = ?",
          [post_text, post_id],
          (err, result) => {
            if (err) {
              res.status(404).json({ err });
              throw err;
            }
            res.status(200).json(result);
          }
        );
      } else {
        res.status(401).json({ error: "Modification non autorisé" });
      }
    }
  );
};
