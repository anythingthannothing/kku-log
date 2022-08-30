const isLoggedIn = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/users/login");
  }
  next();
};

module.exports = isLoggedIn;
