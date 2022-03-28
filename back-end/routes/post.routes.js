const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const postController = require("../controllers/posts.controller");
const multer = require("multer");
const upload = multer();
//const upload = require("../middleware/multer-config");

router.post("/", auth, upload.single("image_url"), postController.createPost);
router.get("/", auth, postController.getAllPost);
router.get("/:id", auth, postController.getOnePost);
router.delete("/:id", auth, postController.deleteOnePost);
router.put("/:id", auth, postController.updatePost);
module.exports = router;
