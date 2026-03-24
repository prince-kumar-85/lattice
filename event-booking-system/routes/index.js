const express = require("express");
const router = express.Router();

const sequelize = require("../config/db");

// Import models
const User = require("../models/user");
const Event = require("../models/event");
const Booking = require("../models/booking");
const Attendance = require("../models/attendance");

// UUID for booking code
const { v4: uuidv4 } = require("uuid");


// 1. GET Events
/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/events", async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
});


// 2. Create Event
/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: Tech Event
 *             description: Node Workshop
 *             date: "2026-04-01"
 *             capacity: 100
 *     responses:
 *       200:
 *         description: Event created
 */
router.post("/events", async (req, res) => {
  const { title, description, date, capacity } = req.body;

  try {
  const event = await Event.create({
    title,
    description,
    date,
    total_capacity: capacity,
    remaining_tickets: capacity,
  });

  res.json(event);
} catch (err) {
  console.error(err);   
  res.status(500).json({ error: err.message });
}
});


// 3. Book Ticket

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Book a ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             user_id: 1
 *             event_id: 1
 *     responses:
 *       200:
 *         description: Booking successful
 */
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


// 4. User Bookings
/**
 * @swagger
 * /users/{id}/bookings:
 *   get:
 *     summary: Get user bookings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/users/:id/bookings", async (req, res) => {
  const bookings = await Booking.findAll({
    where: { user_id: req.params.id },
  });

  res.json(bookings);
});


// 5. Attendance

/**
 * @swagger
 * /events/{id}/attendance:
 *   post:
 *     summary: Mark attendance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             code: "abc-123"
 *     responses:
 *       200:
 *         description: Attendance marked
 */

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


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: Prince
 *             email: prince@gmail.com
 *     responses:
 *       200:
 *         description: User created
 */
router.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.create({ name, email });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Export
module.exports = router;