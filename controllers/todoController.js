class Todo {
  date = new Date();
  constructor(todoName, todoCategory, todoId) {
    this.todoName = todoName;
    this.todoCategory = todoCategory;
    this.todoId = todoId;
  }
}

class AppTodo {
  constructor() {
    this._loadTodo();
  }
  _createTodo() {
    console.log("created todo");
  }
  _loadTodo() {
    console.log("loaded to do");
  }
  _renderTodo() {}
  _showForm() {}
  _hideForm() {}
}

const appTd = new AppTodo();

class TodoController {
  static addTodo = (req, res) => {
    console.log(req.body);
    console.log("you are authenticated");
    appTd._createTodo();
    res.send(req.session);
  };
}

export default TodoController;
