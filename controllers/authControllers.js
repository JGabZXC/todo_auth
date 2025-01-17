import passport from "passport";
import { AppTodo } from "./todoController.js";

import User from "../models/User.js";

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

    const appTd = new AppTodo();
    await appTd.initialize(req.user.id);
    const todos = appTd.todos;

    res.render("pages/dashboard.ejs", {
      pageTitle: title,
      user: req.session.user,
      todo: todos,
    });
  };
}

export default login;
