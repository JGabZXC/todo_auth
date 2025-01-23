import TodoModel from "../models/TodoModel.js";
import Todo from "../models/Todo.js";
import {parse} from "dotenv";

class TodoController {
    static newTodo = (req, res) => {
        try {
            const {description, category, categoryID} = req.body;
            if(!description) throw new Error("Missing description");
            console.log(categoryID)
            const todo = new Todo(req.user.id, req.user.first_name, description, category);

            TodoModel.insertTodo(todo);

            res.redirect(`/dashboard/category/${categoryID}`);
        } catch(err) {
            throw err;
        }
    }

    static newCategory = async (req, res) => {
        try {
            const {category} = req.body;
            const trimCategory = category.trim();
            if(trimCategory.length === 0) throw new Error("Missing credentials");
            if(!category) throw new Error("Missing credentials");

            await TodoModel.insertCategory(req.user.id, category);

            res.redirect("/dashboard");
        } catch (err) {
            throw err;
        }
    }

    static editTodo = (req, res) => {}
    static editCategory = (req, res) => {}
    static editStatus = (req, res) => {}

    static deleteTodo = (req, res) => {}
    static deleteCategory = (req, res) => {}

    static loadTodo = async (userID) => {
        try {
            return await TodoModel.loadTodo(userID);
        } catch (err) {
            throw err;
        }
    }

    static loadCategory = async (req, res) => {
        try {
            return await TodoModel.loadCategory(req.user.id);
        } catch (err) {
            throw err;
        }
    }

    static selectedCategory = async (req, res) => {
        const {id} = req.params;
        const title = "Dashboard";
        try {
            const todoCategory = await this.loadCategory(req, res);
            const todoObj = await this.loadTodo(req.user.id);
            const category = await TodoModel.selectSpecificCategory(req.user.id, id)
            const todo = {
                todoCategory,
                todoObj,
                currentCategory: category
            }

            // check if the ID exists
            const categoryExists = todoCategory.some(cat => cat.id === parseInt(id));

            if(!categoryExists) return res.end("ERROR 404: Category not found");

            res.render("pages/dashboard.ejs", {
                pageTitle: title,
                user: req.session.user,
                todo
            })
        } catch (err) {
            throw err;
        }
    }
}

export default TodoController;