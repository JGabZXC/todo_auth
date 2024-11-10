import passport from "passport";

export const getLogin = (req, res) => {
  res.render("pages/login.ejs");
};

export const postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

export const getDashboard = (req, res) => {
  res.render("pages/dashboard.ejs");
};
