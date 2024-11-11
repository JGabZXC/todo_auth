import User from "../models/User.js";

export const homePage = async (req, res) => {
  console.log(await User.findById({ id: 5 }));
  res.render("index.ejs");
};

export const aboutPage = (req, res) => {
  res.render("pages/about.ejs");
};
