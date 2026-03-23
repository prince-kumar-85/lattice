const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Event = sequelize.define("Event", {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  date: DataTypes.DATE,
  total_capacity: DataTypes.INTEGER,
  remaining_tickets: DataTypes.INTEGER,
});

module.exports = Event;