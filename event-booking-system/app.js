const express = require("express");
const app = express();

app.use(express.json());

// IMPORT ROUTES
const routes = require("./routes");

// USE ROUTES
app.use("/", routes);

module.exports = app;