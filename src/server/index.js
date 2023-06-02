const express = require("express");
const routes = require("../routes");

const app = express();
app.use(express.json());

app.use("/api/v1", routes);

const PORT = process.env.PORT || 5000;

const startServer = () => {
  app.listen(PORT, () => {
    console.log("Server Is Ready on port " + PORT);
  });
};

module.exports = {
  startServer,
};
