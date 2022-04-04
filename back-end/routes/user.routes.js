const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");
//const upload = require("../middleware/multer-config");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getOneUser);
router.put("/:id", auth, userController.updateOneUser);

//Upload

router.post(
  "/upload",
  auth,
  upload.single("file"),
  uploadController.uploadProfil
);

router.get("/upload/:id", auth, uploadController.getProfilPicture);
module.exports = router;
