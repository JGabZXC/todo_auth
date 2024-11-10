import express from "express";
import { homePage, aboutPage } from "../controllers/homeControllers.js";

const router = express.Router();

router.get("/", homePage);

router.get("/about", aboutPage);

export default router;
