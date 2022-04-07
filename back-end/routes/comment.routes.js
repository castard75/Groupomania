const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const commentController = require("../controllers/comment.controller");

router.post("/:id", auth, commentController.createComment);
router.get("/:id/allcomments", auth, commentController.getAllComments);
router.get("/", auth, commentController.getComments);
router.get("/:id", auth, commentController.getOneComment);
router.put("/:id", auth, commentController.updateComment);
router.delete("/:id", auth, commentController.deleteComment);

module.exports = router;
