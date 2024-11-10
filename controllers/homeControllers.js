export const homePage = (req, res) => {
  console.log(req.user);
  res.render("index.ejs");
};

export const aboutPage = (req, res) => {
  res.render("pages/about.ejs");
};
