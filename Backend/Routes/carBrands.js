const express = require("express");
const router = express.Router();
const verify = require("./verifyToken");
const CarBrand = require("../Models/CarBrands");

// Get All brands
router.get("/", async (req, res) => {
   try {
      const brands = await CarBrand.find();
      res.json(brands);
   } catch (error) {
      res.json({ message: err.message });
   }
});

// Get specific brand
router.get("/:id", async (req, res) => {
   try {
      const brand = await CarBrand.findById(req.params.brandId);
      res.json(brand);
   } catch (err) {
      res.json({ message: err.message });
   }
});

// Create a new brand
router.post("/", verify, async (req, res) => {
   const brand = new CarBrand({
      brandName: req.body.brandName,
   });
   console.log(brand);
   try {
      const savedBrand = await brand.save();
      res.json({ savedBrand });
   } catch (err) {
      res.json({ message: err.message });
   }
});

// Update the brand
router.patch("/:id", verify, async (req, res) => {
   try {
      const updatedBrand = await CarBrand.updateOne(
         { _id: req.params },
         {
            $set: {
               brandName: req.body.brandName,
            },
         }
      );

      res.json(updatedBrand);
   } catch (err) {
      res.json({ message: err });
   }
});

// Delete brand
router.delete("/:id", verify, async (req, res) => {
   try {
      const removedBrand = await CarBrand.remove({ _id: req.params.id });
      res.json(removedBrand);
   } catch (err) {
      res.json({ message: err.message });
   }
});

module.exports = router;
