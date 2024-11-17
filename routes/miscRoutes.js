import express from "express";
import misc from "../controllers/miscControllers.js";

const router = express.Router();

import authNoAccess from "../middlewares/authNoAccess.js";

router.get("/intro", misc.getIntro);
router.get("/getAllTodo", misc.getAllTodo);

export default router;
