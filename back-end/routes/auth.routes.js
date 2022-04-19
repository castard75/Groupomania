const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const passwordControl = require("../middleware/passwordValidations");
const validationEmail = require("../middleware/emailToValidate");

router.post(
  "/signup",
  passwordControl.Password,
  validationEmail.emailValidation,
  authController.signup
);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/desactivateAccount/:id", authController.desactivateAccount);

module.exports = router;
