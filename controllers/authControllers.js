import passport from "passport";

class login {
  static getLogin = (req, res) => {
    const title = "Login";
    res.render("pages/login.ejs", { pageTitle: title });
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
    const title = "Dashboard";
    res.render("pages/dashboard.ejs", { pageTitle: title });
  };
}

export default login;
