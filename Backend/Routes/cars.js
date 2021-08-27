const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");
const multer = require("multer");

// File upload settings
const upload = multer({
   storage: multer.diskStorage({
      destination: function (req, file, cb) {
         cb(null, "./Uploads/");
      },
      filename: function (req, file, cb) {
         cb(null, Date.now() + file.originalname);
      },
   }),
   limits: {
      fileSize: 1024 * 1024 * 5,
   },
   fileFilter: (req, file, cb) => {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
         cb(null, true);
      } else {
         cb(null, false);
      }
   },
});
const Car = require("../Models/Cars");
const Image = require("../Models/Images");

// Get all cars
router.get("/", async (req, res) => {
   let filters = {};

   if (parseInt(req.query.roleId) === 2) {
      filters = { ...filters, userId: req.query.userId };
   }
   try {
      const cars = await Car.where(filters);
      res.json(cars);
   } catch (err) {
      res.json({ message: err.message });
   }
});

// Get specific car
router.get("/:id", async (req, res) => {
   try {
      const car = await Car.findById(req.params.carId);
      res.json(car);
   } catch (err) {
      res.json({ message: err.message });
   }
});

// Create a new car
router.post("/", verify, upload.single("carImage"), async (req, res) => {
   const car = new Car({
      seatsNum: req.body.seatsNum,
      priceDay: req.body.priceDay,
      fuelType: req.body.fuelType,
      images: req.file.filename,
      userId: req.body.userId,
   });

   const image = new Image({
      imageName: req.file.filename,
      carId: car._id,
   });

   try {
      const savedCar = await car.save();
      const savedImage = await image.save();

      res.json({ savedCar, savedImage });
   } catch (err) {
      res.json({ message: err.message });
   }
});

// Update the car
router.patch("/:id", verify, async (req, res) => {
   try {
      const updatedCar = await Car.updateOne(
         { _id: req.params },
         {
            $set: {
               seatsNum: req.body.seatsNum,
               priceDay: req.body.priceDay,
               fuelType: req.body.fuelType,
               userId: req.body.userId,
            },
         }
      );

      res.json(updatedCar);
   } catch (err) {
      res.json({ message: err });
   }
});

// Delete car
router.delete("/:id", verify, async (req, res) => {
   try {
      const removedCar = await Car.remove({ _id: req.params.id });
      res.json(removedCar);
   } catch (err) {
      res.json({ message: err.message });
   }
});

module.exports = router;
