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
  const { message, post_id, author_id, author_firstname, author_lastname } =
    req.body;
  const sql = `INSERT INTO comment (post_id, author_id, author_firstname, author_lastname, message, created_at) VALUES ( ${post_id}, ${author_id}, "${author_firstname}", "${author_lastname}", "${message}", CURRENT_TIMESTAMP)`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      console.log(err);
      throw err;
    }
    res.status(200).json(result);
  });
};
