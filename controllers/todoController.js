import TodoModel from "../models/TodoModel.js";

class Todo {
    date = new Date();
    constructor(user_id, user_firstname, description, category) {
        this.user_id = user_id;
        this.user_firstname = user_firstname;
        this.description = description;
        this.category = category;
        this.status = 'Pending';
    }
}

class TodoController {
    static newTodo = (req, res) => {
        try {
            const {description, category} = req.body;
            if(!description) throw new Error("Missing description");

            const todo = new Todo(req.user.id, req.user.first_name, description, category);
            TodoModel.insertTodo(todo);
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

    static loadTodo = async (req, res) => {
        try {
            return await TodoModel.loadTodo(req.user.id);
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

    static selectedCategory = (req, res) => {
        console.log(req.params);
    }
}

export default TodoController;