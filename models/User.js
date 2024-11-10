import pkg from "pg";
import bcrypt from "bcrypt";

const { Pool } = pkg;
const pool = new Pool({
  user: "postgres", // Replace with your database username
  host: "localhost", // Replace with your database host
  database: "todo_authdb", // Replace with your database name
  password: "gabData", // Replace with your database password
  port: 5432, // Default PostgreSQL port
});

class User {
  static async findAcc(query) {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 OR username = $1",
      [query.username]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) return null;
    return result.rows[0]; // Return the user object
  }

  // Compare the entered password with the stored hashed password
  static async verifyPassword(inputPassword, storedPassword) {
    console.log(inputPassword, storedPassword);
    return bcrypt.compare(inputPassword, storedPassword); // Compare password with hash
  }
}
export default User;
