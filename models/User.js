import axios from "axios";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const APIURL = process.env.API_URL;

// Headers to access API
const headers = { headers: { authorization: process.env.API_KEY } };

class User {
  static async findAcc(data) {
    try {
      // Find Account in API
      const result = await axios.get(
        `${APIURL}/find/acc/?acc=${data.username}`,
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

  static async findById(data) {
    try {
      const result = await axios.get(
        `${APIURL}/find/acc/?id=${data.id}`,
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

  static async getTodo(data) {
    try {
      const result = await axios.get(
        `${APIURL}/todo/get/all/${data.id}`,
        headers
      );
      return result.data;
    } catch (err) {
      // console.error(err.response);
      return err.response.data;
    }
  }
}
export default User;
