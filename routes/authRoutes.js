import express from "express";
import login from "../controllers/authControllers.js";

import isAuth from "../middlewares/isAuth.js";
import authNoAccess from "../middlewares/authNoAccess.js";

const router = express.Router();

router.get("/login", authNoAccess, login.getLogin);

router.post("/login", authNoAccess, login.postLogin);

router.get("/logout", isAuth, login.logout);

router.get("/dashboard", isAuth, login.getDashboard);

export default router;
