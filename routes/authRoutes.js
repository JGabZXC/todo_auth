import express from "express";
import login from "../controllers/authControllers.js";

import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/login", login.getLogin);

router.post("/login", login.postLogin);

router.get("/logout", isAuth, login.logout);

router.get("/dashboard", isAuth, login.getDashboard);

export default router;
