const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");

const Reservation = require("../Models/Reservations");

router.post("/", verify, async (req, res) => {
   const reservation = new Reservation({
      dateFrom: req.body.dateFrom,
      dateTo: req.body.dateTo,
      reservationStatus: req.body.reservationStatus,
      userId: req.body.userId,
      carId: req.body.carId,
   });

   try {
      const savedReservation = await reservation.save();
      res.json({ savedReservation });
   } catch (err) {
      res.json({ message: err.message });
   }
});

module.exports = router;
