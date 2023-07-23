const express = require("express");
const app = express();
const port = 3000;
const sqlite3 = require("sqlite3").verbose();
require("dotenv").config();

//items in the global namespace are accessible throught out the node application
global.db = new sqlite3.Database("./database.db", function (err) {
  if (err) {
    console.error(err);
    process.exit(1); //Bail out we can't connect to the DB
  } else {
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
  }
});

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

const passport = require("passport");
const session = require("express-session");

//set the app to use ejs for rendering
app.set("view engine", "ejs");

// configuring user authentication
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "shuuuu",
  })
);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.use(express.static(__dirname + "/public"));

app.use(passport.initialize());
app.use(passport.session());


//this adds all the userRoutes to the app under the path /user
app.use("/user", userRoutes);
app.use("/auth", authRoutes)




app.get("/error", (req, res) => res.send("error logging in"));







app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
