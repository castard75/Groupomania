const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const passwordControl = require("../middleware/passwordValidations");

router.post("/signup", passwordControl.Password, authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/desactivateAccount/:id", authController.desactivateAccount);

module.exports = router;
