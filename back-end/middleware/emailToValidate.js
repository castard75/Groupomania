const emailTovalidate = require("email-validator");

module.exports.emailValidation = (req, res, next) => {
  if (!emailTovalidate.validate(req.body.email)) {
    res.status(400).json({ error: "Veuillez entrez une adresse mail valide" });
  } else {
    next();
  }
};