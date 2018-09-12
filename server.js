const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();

hbs.registerPartials("./views/partials");
app.set("view engine", "hbs");
app.use(express.static("./public"));

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now} - ${req.method} - ${req.url}`;
  fs.appendFile("server.log", log + "\n", (error) => {
    if (error) {
      console.log("Unable to append to server.log");
    }
  })
  console.log(log)
  next();
});

app.use((req, res, next) => {
  res.render("maintenance.hbs");
});

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page!",
    welcomeMessage: "Welcome to the homepage",
    currentYear: new Date().getFullYear()
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page!",
    currentYear: new Date().getFullYear()
  });
});

app.listen(8080, () => {
  console.log("server up");
});
