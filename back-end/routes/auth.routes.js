const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const passwordControl = require("../middleware/passwordValidations");
const validationEmail = require("../middleware/emailToValidate");
const { userNameValidation } = require("../middleware/userNameValidation");
const { lastNameValidation } = require("../middleware/lastNameValidation");

router.post(
  "/signup",
  userNameValidation,
  lastNameValidation,
  passwordControl.Password,
  validationEmail.emailValidation,
  authController.signup
);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/desactivateAccount/:id", authController.desactivateAccount);

module.exports = router;
