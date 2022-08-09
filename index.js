const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.use((req, res) => {
  console.log("We got a new request!!!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}! 🚀`);
});
