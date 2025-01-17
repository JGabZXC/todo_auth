import TodoDB from "../models/Todo.js";

let appTd;

class Todo {
  date = new Date();
  constructor(userID, userFirstName, todoDescription, todoCategory) {
    this.userID = userID;
    this.userFirstName = userFirstName;
    this.todoDescription = todoDescription;
    this.todoCategory = todoCategory;
    this.todoStatus = "Pending";
  }
}

class AppTodo {
  todos = [];

  async initialize(userID) {
    try {
      this.todos = await this.#loadTodos(userID);
    } catch (e) {
      console.error(e.message);
      throw new Error("Failed to initialize todos")
    }
  }

  async _createTodo(userID, userFirstName, todoDescription, todoCategory) {
    const todo = new Todo(userID, userFirstName, todoDescription, todoCategory);
    try {
      const result = await TodoDB.insertTodo(todo);
      this.todos.push(todo)
      return result;
    } catch(e) {
      console.error(e.message);
      throw new Error('Unable to create a new todo')
    }
  }

  async #loadTodos(userID) {
    if(!userID) throw new Error("No user ID provided");

    const result = await TodoDB.loadTodo(userID)
    if(!result || result.rows.length === 0) {
      throw new Error('No todos found for the user');
    }

    return result.rows;
  }


}

class TodoController {
  static addTodoGET = (req, res) => {
    try {
      res.send(req.session);
    } catch (err) {
      console.error(err.message);
      res.send(err.message);
    }
  };

  static addTodoPOST = (req, res) => {
    try {
      appTd = new AppTodo();
      const { todoDescription, todoCategory } = req.body;

      if (todoDescription.length > 100)
        throw new Error("Todo description length exceeded 100 characters");

      appTd._createTodo(
        req.user.id,
        req.user.first_name,
        todoDescription,
        todoCategory
      );

      res.redirect("/dashboard");
    } catch (error) {
      console.error(err.message);
      res.send(err.message);
    }
  };
}

export { AppTodo };
export default TodoController;
