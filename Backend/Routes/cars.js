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
   const pageIndex = req.query.pageIndex || 0;

   if (parseInt(req.query.roleId) === 2) {
      filters = { ...filters, userId: req.query.userId };
   }
   if (req.query.brandId) {
      filters = { ...filters, brandId: req.query.brandId };
   }
   if (req.query.modelId) {
      filters = { ...filters, modelId: req.query.modelId };
   }
   if (req.query.bodyTypeId) {
      filters = { ...filters, bodyTypeId: req.query.bodyTypeId };
   }
   if (req.query.fuelTypeId) {
      filters = { ...filters, fuelTypeId: req.query.fuelTypeId };
   }
   try {
      const totalCount = await Car.count(filters);
      const cars = await Car.where(filters)
         .limit(3)
         .skip(pageIndex * 3);

      res.json({ cars, totalCount });
   } catch (err) {
      res.json({ message: err.message });
   }
});

// Get specific car
router.get("/:id", async (req, res) => {
   try {
      const car = await Car.findById(req.params.id);

      res.json(car);
   } catch (err) {
      res.json({ message: err.message });
   }
});

// Create a new car
router.post("/", verify, upload.single("carImage"), async (req, res) => {
   const car = new Car({
      brandId: req.body.brandId,
      brandName: req.body.brandName,
      modelId: req.body.modelId,
      modelName: req.body.modelName,
      fuelTypeId: req.body.fuelTypeId,
      fuelTypeName: req.body.fuelTypeName,
      bodyTypeId: req.body.bodyTypeId,
      bodyTypeName: req.body.bodyTypeName,
      seatsNum: req.body.seatsNum,
      doorsNum: req.body.doorsNum,
      priceDay: req.body.priceDay,
      enginePower: req.body.enginePower,
      engineCapacity: req.body.engineCapacity,
      userId: req.body.userId,
      userName: req.body.userName,
      images: req.file.filename,
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
