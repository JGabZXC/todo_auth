import passport from "passport";
import todoController from "./todoController.js";
import TodoController from "./todoController.js";

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
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  });

  static logout = (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  };

  static getDashboard = async (req, res) => {
    const title = "Dashboard";
    try {
      const todoCategory = await TodoController.loadCategory(req, res);
      const todo = {
        todoCategory
      }
      res.render("pages/dashboard.ejs", {
        pageTitle: title,
        user: req.session.user,
        todo
      });
    } catch (err) {
      res.render("pages/dashboard.ejs", {
        pageTitle: title,
        user: req.session.user,
        message: err.message,
      });
    }
  };
}

export default login;
