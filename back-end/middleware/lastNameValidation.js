module.exports.lastNameValidation = (req, res, next) => {
  if (/^[A-Za-z]{3,20}$/.test(req.body.lastname)) {
    next();
  } else {
    res.status(200).json({
      errorLastname:
        "Le nom doit faire minimum 3 caractères et ne pas dépasser 20 caractères",
    });
  }
};
