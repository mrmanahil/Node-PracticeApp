const { start } = require("./database");
const { startServer } = require("./server");
require("dotenv").config();

const handleStartApp = async () => {
  await start();
  await startServer();
};

handleStartApp();
