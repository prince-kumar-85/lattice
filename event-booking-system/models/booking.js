const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = sequelize.define("Booking", {
  user_id: DataTypes.INTEGER,
  event_id: DataTypes.INTEGER,
  booking_code: DataTypes.STRING,
}, {
  tableName: "bookings",
  timestamps: false
});