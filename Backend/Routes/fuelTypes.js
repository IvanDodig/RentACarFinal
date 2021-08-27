const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");
const FuelType = require("../Models/FuelTypes");

// Get All fuel types
router.get("/", async (req, res) => {
   try {
      const fuelTypes = await FuelType.find();
      res.json(fuelTypes);
   } catch (error) {
      res.json({ message: err.message });
   }
});

// Get specific fuel type
router.get("/:id", async (req, res) => {
   try {
      const fuelType = await FuelType.findById(req.params.fuelTypeId);
      res.json(fuelType);
   } catch (err) {
      res.json({ message: err.message });
   }
});

// Create a new fuel type
router.post("/", verify, async (req, res) => {
   const fuelType = new FuelType({
      fuelType: req.body.fuelType,
   });
   try {
      const savedFuelType = await fuelType.save();
      res.json({ savedFuelType });
   } catch (err) {
      res.json({ message: err.message });
   }
});

// Update the fuel type
router.patch("/:id", verify, async (req, res) => {
   try {
      const updatedFuelType = await FuelType.updateOne(
         { _id: req.params },
         {
            $set: {
               fuelType: req.body.fuelType,
            },
         }
      );

      res.json(updatedFuelType);
   } catch (err) {
      res.json({ message: err });
   }
});

// Delete fuel type
router.delete("/:id", verify, async (req, res) => {
   try {
      const removedFuelType = await FuelType.remove({ _id: req.params.id });
      res.json(removedFuelType);
   } catch (err) {
      res.json({ message: err.message });
   }
});

module.exports = router;
