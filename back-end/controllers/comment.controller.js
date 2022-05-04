const dbc = require("../config/db");
const db = dbc.getDB();

exports.deleteComment = (req, res) => {
  const commentId = req.params.id;
  const sql = `DELETE FROM comment WHERE comment.id = ${commentId}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getOneComment = (req, res) => {
  const commentId = req.params.id;
  const sql = `SELECT * FROM comment WHERE id = ${commentId}`;
  db.query(sql, (err, result) => {
    if (err) res.status(404).json({ err });
    else {
    }
    res.status(200).json(result);
  });
};
exports.getComments = (req, res) => {
  /* on recupere tt les commentaire lié a un post.Je fais la liaison entre les commentaire et le post_id qui est la Fk de post(id)*/
  const sql = `SELECT * FROM comment `;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getAllComments = (req, res) => {
  const { id: postId } = req.params;
  /* on recupere tt les commentaire lié a un post.Je fais la liaison entre les commentaire et le post_id qui est la Fk de post(id)*/
  const sql = `SELECT * FROM comment WHERE comment.post_id = ${postId}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.createComment = (req, res, next) => {
  const { message, author_id } = req.body;
  const { id: post_id } = req.params;
  const sql = `INSERT INTO comment (post_id, author_id, message, created_at) VALUES ( ${post_id}, ${author_id}, "${message}", CURRENT_TIMESTAMP)`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      console.log(err);
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.deleteComment = (req, res) => {
  const commentId = req.params.id;

  db.query(
    "SELECT * FROM comment JOIN users ON (users.user_id = comment.author_id) WHERE id=?",
    [commentId],
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }

      if (req.auth.userId == 33) {
        db.query(
          "DELETE FROM comment WHERE comment.id =?",
          [commentId],
          (err, result) => {
            if (err) {
              res.status(404).json({ err });
              throw err;
            }
            res.status(200).json(result);
          }
        );
      } else if (result[0].author_id === req.auth.userId) {
        db.query(
          "DELETE FROM comment WHERE comment.id =?",
          [commentId],
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

exports.updateComment = (req, res) => {
  const commentId = req.params.id;
  const { message } = req.body;

  db.query(
    "SELECT * FROM comment JOIN users ON (users.user_id = comment.author_id) WHERE id=?",
    [commentId],
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }

      if (req.auth.userId == 33) {
        db.query(
          "UPDATE comment SET message =? WHERE id =?",
          [message, commentId],
          (err, result) => {
            if (err) {
              res.status(404).json({ err });
              throw err;
            } else {
              res.status(200).json(result);
            }
          }
        );
      } else if (result[0].author_id === req.auth.userId) {
        db.query(
          "UPDATE comment SET message =? WHERE id =?",
          [message, commentId],
          (err, result) => {
            if (err) {
              res.status(404).json({ err });
              throw err;
            } else {
              res.status(200).json(result);
            }
          }
        );
      } else {
        res.status(401).json({ error: "Modification non autorisé" });
      }
    }
  );
};
