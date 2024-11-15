import User from "../models/User.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const APIURL = process.env.API_URL;
const headers = { headers: { authorization: process.env.API_KEY } };

class register {
  static registerPage = async (req, res) => {
    const title = "Register";
    res.render("pages/register.ejs", {
      pageTitle: title,
      user: req.session.user,
      message: req.flash("error"),
    });
  };

  static registerSubmit = async (req, res) => {
    try {
      const {
        email,
        username,
        firstname,
        lastname,
        password,
        repassword,
        sex,
      } = req.body;
      const checkEmail = await User.findAcc({ username: email });
      const checkUsername = await User.findAcc({ username });
      if (password !== repassword) {
        req.flash("error", "Your password does not match");
      }

      if (checkEmail || checkUsername) {
        req.flash(
          "error",
          `This ${checkEmail ? "email" : "username"} already exist`
        );
      }

      const insert = await axios.post(`${APIURL}/register/user`, {
        headers: { authorization: process.env.API_KEY },
        email,
        username,
        firstName: firstname,
        lastName: lastname,
        password,
        sex,
      });
      req.flash("success", `${insert.data.message}`);
      return res.redirect("/login");
    } catch (err) {
      console.error(err);
      console.log(err?.response?.data?.message);
      if (err?.response?.data?.message) {
        req.flash("error", `${err.response.data.message}`);
      }

      return res.redirect("/register");
    }
  };
}

export default register;
