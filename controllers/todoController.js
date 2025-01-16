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
  constructor() {
    this._loadTodo();
  }

  _createTodo(userID, userFirstName, todoDescription, todoCategory) {
    const tod = new Todo(userID, userFirstName, todoDescription, todoCategory);
    return TodoDB.insertTodo(tod);
  }

  async _loadTodo(userID) {
    const result = await TodoDB.loadTodo(userID);
    if (result.rows < 0) throw new Error("There's no to do found");
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
