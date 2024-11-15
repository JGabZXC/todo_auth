import express from "express";
import register from "../controllers/registerController.js";
import authNoAccess from "../middlewares/authNoAccess.js";

const router = express.Router();

router.get("/register", authNoAccess, register.registerPage);

router.post("/register", authNoAccess, register.registerSubmit);

export default router;
