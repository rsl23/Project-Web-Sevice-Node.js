const express = require("express");

const app = express();

const route = require("./src/routes/route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/cuan", route);
app.get('/', (req, res) => {
  console.log('Ping route hit');
  res.send('Server jalan');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server berada di localhost:${port}`);
});
