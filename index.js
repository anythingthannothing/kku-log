const express = require("express");
const app = express();
const PORT = 3000;

app.use(() => {
  console.log("We got a new request!!!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}! 🚀`);
});
