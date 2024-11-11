import passport from "passport";

class login {
  static getLogin = (req, res) => {
    res.render("pages/login.ejs");
  };

  static postLogin = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  });

  static logout = (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  };

  static getDashboard = (req, res) => {
    res.render("pages/dashboard.ejs");
  };
}

export default login;
