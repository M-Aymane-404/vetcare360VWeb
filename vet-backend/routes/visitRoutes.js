const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Visit = require("../models/Visit");
const Pet = require("../models/Pet");

// Ajouter une visite avec validation
router.post(
  "/",
  [
    body("description")
      .notEmpty().withMessage("La description est requise"),
    body("pet")
      .isMongoId().withMessage("ID de l'animal invalide")
  ]
  ,
  async (req, res, next) => {
    try {
      // Validation des données
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array().map(e => ({ champ: e.path, message: e.msg }))
        });
      }

      // Vérification de l'animal
      const pet = await Pet.findById(req.body.pet);
      if (!pet) {
        return res.status(404).json({
          success: false,
          message: "Animal non trouvé"
        });
      }

      // Création de la visite
      const visit = await Visit.create({
        ...req.body,
        date: req.body.date || Date.now()
      });

      // Mise à jour de l'animal
      await Pet.findByIdAndUpdate(
        req.body.pet,
        { $push: { visits: visit._id } }
      );

      res.status(201).json({
        success: true,
        data: visit
      });

    } catch (err) {
      next(err);
    }
  }
);

// Lister les visites d'un animal avec pagination
router.get("/pet/:petId",
  [
    param("petId")
      .isMongoId().withMessage("ID animal invalide")
  ],
  async (req, res, next) => {
    try {
      // Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array().map(e => ({ champ: e.path, message: e.msg }))
        });
      }

      // Paramètres de pagination
      const page = Number.isInteger(+req.query.page) ? Math.max(1, +req.query.page) : 1;
      const limit = Number.isInteger(+req.query.limit) ? Math.min(100, +req.query.limit) : 10;
      const skip = (page - 1) * limit;

      // Requête optimisée
      const [visits, total] = await Promise.all([
        Visit.find({ pet: req.params.petId })
          .sort("-date")
          .skip(skip)
          .limit(limit)
          .populate("pet", "name type"),
        Visit.countDocuments({ pet: req.params.petId })
      ]);

      res.json({
        success: true,
        data: visits,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalVisits: total,
          itemsPerPage: limit
        }
      });

    } catch (err) {
      next(err);
    }
  }
);


// Lister toutes les visites (optionnel mais utile pour tester)
router.get("/", async (req, res, next) => {
  try {
    const visits = await Visit.find().populate("pet", "name type");
    res.json({
      success: true,
      data: visits
    });
  } catch (err) {
    next(err);
  }
});


module.exports = router;