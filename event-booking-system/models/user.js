const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = sequelize.define("User", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
}, {
  tableName: "users",
  timestamps: false
});