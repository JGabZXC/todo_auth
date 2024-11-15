import passport from "passport";

class login {
  static getLogin = (req, res) => {
    const title = "Login";
    res.render("pages/login.ejs", {
      pageTitle: title,
      message: req.flash(),
      user: req.session.user,
    });
  };

  static postLogin = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  });

  static logout = (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  };

  static getDashboard = (req, res) => {
    const title = "Dashboard";
    res.render("pages/dashboard.ejs", {
      pageTitle: title,
      user: req.session.user,
    });
  };
}

export default login;
