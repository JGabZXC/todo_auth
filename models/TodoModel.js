import db from "../db.js";

class TodoModel {
    static async insertTodo(todo) {
        console.log(todo);
    }

    static async insertCategory(userID, category) {
        try {
            const result = await db.query('INSERT INTO category (user_id, category) VALUES ($1, $2) RETURNING *', [userID, category]);
            if(result.rowCount === 0) throw new Error("Category was not created");
            return result.rows;
        } catch (err) {
            throw err;
        }
    }

    static async loadTodo(userID) {
        try {
            const result = await db.query('SELECT * FROM todos WHERE user_id = $1', [userID]);
            if(result.rowCount === 0) return [];
            return result.rows;
        } catch (err) {
            throw err;
        }
    }

    static async loadCategory(userID) {
        try {
            const result = await db.query('SELECT * FROM category WHERE user_id = $1', [userID]);
            if(result.rowCount === 0) return [];
            return result.rows;
        } catch (err) {
            throw err;
        }
    }

    static async selectSpecificCategory(userID, id) {
        try {
            const result = await db.query('SELECT * FROM category WHERE user_id = $1 AND id = $2', [userID, id]);
            if(result.rowCount === 0) return {error: "Category not found"};
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }
}

export default TodoModel;