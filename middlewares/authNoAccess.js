function authNoAccess(req, res, next) {
  if (req.isAuthenticated()) return res.redirect("/");
  next();
}

export default authNoAccess;
