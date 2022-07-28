function redirectIfAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/tweets");
  } else {
    return next();
  }
}

module.exports = redirectIfAuthenticated;
