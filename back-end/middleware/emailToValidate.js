const emailTovalidate = require("email-validator");

module.exports.emailValidation = (req, res, next) => {
  if (!emailTovalidate.validate(req.body.email)) {
    res
      .status(200)
      .json({ errorMail: "Veuillez entrez une adresse mail valide" });
  } else {
    next();
  }
};
