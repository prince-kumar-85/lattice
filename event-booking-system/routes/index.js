const express = require("express");
const router = express.Router();

const sequelize = require("../config/db");

// Import models
const Event = require("../models/event");
const Booking = require("../models/booking");
const Attendance = require("../models/attendance");

// UUID for booking code
const { v4: uuidv4 } = require("uuid");


// ✅ 1. GET Events
router.get("/events", async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
});


// ✅ 2. Create Event
router.post("/events", async (req, res) => {
  const { title, description, date, capacity } = req.body;

  const event = await Event.create({
    title,
    description,
    date,
    total_capacity: capacity,
    remaining_tickets: capacity,
  });

  res.json(event);
});


// ✅ 3. Book Ticket
router.post("/bookings", async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { user_id, event_id } = req.body;

    const event = await Event.findByPk(event_id, { transaction: t });

    if (!event || event.remaining_tickets <= 0) {
      return res.status(400).json({ message: "No tickets left" });
    }

    event.remaining_tickets -= 1;
    await event.save({ transaction: t });

    const booking = await Booking.create({
      user_id,
      event_id,
      booking_code: uuidv4(),
    }, { transaction: t });

    await t.commit();

    res.json(booking);
  } catch (err) {
    await t.rollback();
    res.status(500).json(err.message);
  }
});


// ✅ 4. User Bookings
router.get("/users/:id/bookings", async (req, res) => {
  const bookings = await Booking.findAll({
    where: { user_id: req.params.id },
  });

  res.json(bookings);
});


// ✅ 5. Attendance
router.post("/events/:id/attendance", async (req, res) => {
  const { code } = req.body;

  const booking = await Booking.findOne({
    where: { booking_code: code },
  });

  if (!booking) {
    return res.status(404).json({ message: "Invalid code" });
  }

  await Attendance.create({ booking_code: code });

  res.json({ message: "Attendance marked" });
});


// ✅ Export
module.exports = router;