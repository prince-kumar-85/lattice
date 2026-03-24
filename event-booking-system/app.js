const express = require("express");
const app = express();

app.use(express.json());

const routes = require("./routes");
app.use("/", routes);

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;