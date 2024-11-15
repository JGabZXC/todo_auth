function sessionUser(req, res, next) {
  if (req.isAuthenticated) {
    req.session.user = req.user;
  } else {
    req.session.user = null;
  }
  next();
}

export default sessionUser;
