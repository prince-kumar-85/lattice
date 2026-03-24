const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = sequelize.define("Event", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  date: DataTypes.DATE,
  total_capacity: DataTypes.INTEGER,
  remaining_tickets: DataTypes.INTEGER,
}, {
  tableName: "events",
  timestamps: false
});