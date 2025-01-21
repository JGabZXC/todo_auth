import express from "express";
import TodoController from "../controllers/todoController.js";

import isAuth from "../middlewares/isAuth.js";
const router = express.Router();

router.post('/dashboard/newcategory', isAuth, TodoController.newCategory);

router.get('/dashboard/category/:id', isAuth, TodoController.selectedCategory);

export default router;