require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/db");

sequelize.sync({ force: true }).then(() => {
  console.log("DB Reset & Connected");

  app.listen(process.env.PORT, () => {
    console.log("Server running");
  });
});