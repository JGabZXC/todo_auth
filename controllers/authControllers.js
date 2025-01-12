import passport from "passport";

import User from "../models/User.js";

class appTodo {
  constructor(todoName, todoCategory, todoId) {
    this.todoName = todoName;
    this.todoDate = new Date();
  }
}

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
    const todo = await User.getTodo({ id: req.session.user.id });
    res.render("pages/dashboard.ejs", {
      pageTitle: title,
      user: req.session.user,
      todo: todo.data,
    });
  };
}

export default login;
