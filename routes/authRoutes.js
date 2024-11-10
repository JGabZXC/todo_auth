import express from "express";
import {
  getLogin,
  postLogin,
  logout,
  getDashboard,
} from "../controllers/authControllers.js";

const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

router.get("/login", getLogin);

router.post("/login", postLogin);

router.get("/logout", logout);

router.get("/dashboard", ensureAuthenticated, getDashboard);

export default router;
