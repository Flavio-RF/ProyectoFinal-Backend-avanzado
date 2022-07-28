function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/sesions");
  }
}

module.exports = ensureAuthenticated;
