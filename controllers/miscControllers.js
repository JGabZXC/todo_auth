import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const APIURL = process.env.API_URL;
const headers = { headers: { authorization: process.env.API_KEY } };

class misc {
  static getIntro = async (req, res) => {
    try {
      const receive = await axios.get(`${APIURL}/intro`, headers);
      res.json(receive.data);
    } catch (err) {
      console.error(err.message);
      res.redirect("/");
    }
  };

  static getAllTodo = async (req, res) => {
    try {
      const { id } = req.session.user;
      const getAll = await axios.get(`${APIURL}/todo/get/all/${id}`, headers);
      res.json(getAll.data);
    } catch (err) {
      console.error(err.message);
      if (err?.response)
        return res.status(err.response.data.status).json(err.response.data);
      return res.status(err).redirect("/");
    }
  };
}

export default misc;
