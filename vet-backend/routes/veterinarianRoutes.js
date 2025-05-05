const express = require("express");
const router = express.Router();
const { param } = require("express-validator");

const Veterinarian = require("../models/Veterinarian");

// Afficher la liste des vétérinaires
router.get("/", async (req, res, next) => {
  try {
    const vets = await Veterinarian.find();
    res.json({ success: true, data: vets });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
