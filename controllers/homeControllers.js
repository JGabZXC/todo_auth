import introduction from "../lib/introduction.js";

export const homePage = async (req, res) => {
  const title = "Home";
  res.render("index.ejs", {
    pageTitle: title,
    user: req.session.user,
    intro: introduction(),
  });
};

export const aboutPage = (req, res) => {
  const title = "About";
  res.render("pages/about.ejs", { pageTitle: title, user: req.session.user });
};
