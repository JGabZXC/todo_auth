import db from "../db.js";

class TodoDB {
  static async insertTodo(todo) {
    const {
      userID,
      userFirstName,
      todoDescription,
      todoCategory,
      date,
      todoStatus,
    } = todo;
    const result = await db.query(
      "INSERT INTO todos (user_id, user_firstname, description, category, todo_created, status) VALUES ($1, $2, $3, $4, $5, $6)",
      [userID, userFirstName, todoDescription, todoCategory, date, todoStatus]
    );

    if (result.rowCount < 0) throw new Error("Error with inserting to do");

    return result;
  }

  static async loadTodo(userID) {
    const result = db.query("SELECT * FROM todos where user_id = $1", [userID]);

    return result;
  }
}

export default TodoDB;
