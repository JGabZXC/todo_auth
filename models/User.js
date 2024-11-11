import pkg from "pg";
import axios from "axios";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const APIURL = process.env.API_URL;

const { Pool } = pkg;
const pool = new Pool({
  user: "postgres", // Replace with your database username
  host: "localhost", // Replace with your database host
  database: "todo_authdb", // Replace with your database name
  password: "gabData", // Replace with your database password
  port: 5432, // Default PostgreSQL port
});

// Headers to access API
const headers = { headers: { authorization: process.env.API_KEY } };

class User {
  static async findAcc(query) {
    try {
      // Find Account in API
      const result = await axios.get(
        `${APIURL}/find/acc/?acc=${query.username}`,
        headers
      );

      if (!result.data.length > 0) return null;

      return result.data[0];
    } catch (err) {
      if (err.response) {
        console.error(err.response?.data);
        return err.response?.data.message;
      }
    }
    console.error(err);
    return {};
  }

  static async findById(query) {
    try {
      const result = await axios.get(
        `${APIURL}/find/acc/?id=${query.id}`,
        headers
      );
      if (!result.data.length > 0) return null;
      return result.data;
    } catch (err) {
      console.error(err);
    }
  }

  // Compare the entered password with the stored hashed password
  static async verifyPassword(inputPassword, storedPassword) {
    return bcrypt.compare(inputPassword, storedPassword); // Compare password with hash
  }
}
export default User;
