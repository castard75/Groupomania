module.exports.userNameValidation = (req, res, next) => {
  if (/^[A-Za-z]{3,20}$/.test(req.body.firstname)) {
    next();
  } else {
    res.status(400).json({
      errorFirstname:
        "Le prénom doit faire minimum 3 caractères et ne pas dépasser 20 caractères",
    });
  }
};
