const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = sequelize.define("Attendance", {
  booking_code: DataTypes.STRING,
}, {
  tableName: "attendance",
  timestamps: false
});