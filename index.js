const express = require("express");

const app = express();

const route = require("./src/routes/route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/cuan", route);

const port = 3000;
app.listen(port, () => {
  console.log(`Server berada di localhost:${port}`);
});
