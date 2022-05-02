const passwordToValidate = require("../models/passwordValidation");

module.exports.Password = (req, res, next) => {
  if (passwordToValidate.validate(req.body.password) == false) {
    res.status(200).json({
      errorPassword:
        "Votre mot de passe doit faire 10 caractère au moins, avec une maj, une min et un chiffre au moins.",
    });
  } else {
    next();
  }
};
