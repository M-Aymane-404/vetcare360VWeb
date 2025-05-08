const express = require("express");
const router = express.Router();
const { body, param, validationResult } = require("express-validator");
const Pet = require("../models/Pet");
const Owner = require("../models/Owner");
const mongoose = require("mongoose");

// Ajouter un animal avec validation
router.post(
  "/",
  [
    body("name")
      .trim()
      .notEmpty().withMessage("Le nom est requis")
      .isLength({ max: 30 }).withMessage("30 caractères max"),
    body("type")
      .isIn(["dog", "cat", "bird", "hamster", "lizard"])
      .withMessage("Type invalide"),
    body("owner")
      .isMongoId().withMessage("ID du propriétaire invalide")
  ]
  ,
  async (req, res, next) => {
    try {
      // Validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array().map(e => ({
            champ: e.path,
            message: e.msg,
            valeur: e.value || null
          }))
        });
      }

      // Vérification du propriétaire
      const owner = await Owner.findById(req.body.owner);
      if (!owner) {
        return res.status(404).json({
          success: false,
          message: "Propriétaire non trouvé"
        });
      }

      // Création de l'animal
      const pet = new Pet(req.body);
      await pet.save();

      // Mise à jour du propriétaire
      await Owner.findByIdAndUpdate(
        req.body.owner,
        { $push: { pets: pet._id } },
        { new: true }
      );

      res.status(201).json({
        success: true,
        data: pet
      });

    } catch (err) {
      next(err);
    }
  }
);

// Récupérer un animal par ID
router.get("/:id",
  [
    param("id")
      .isMongoId().withMessage("ID invalide")
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

      const pet = await Pet.findById(req.params.id)
  .populate({
    path: "visits",
    select: "date description"
  })
    .populate("owner", "firstName lastName address city telephone"); // <-- ajout


    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Animal non trouvé"
      });
    }

      res.json({
        success: true,
        data: pet
      });

    } catch (err) {
      next(err);
    }
  }
);

// Modifier un animal
router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("ID invalide"),
    body("name").optional().notEmpty().withMessage("Nom requis"),
    body("birthDate").optional().isISO8601().withMessage("Date invalide"),
    body("type")
      .optional()
      .isIn(["dog", "cat", "bird", "hamster", "lizard"])
      .withMessage("Type invalide")
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array().map(e => ({ champ: e.path, message: e.msg })) 
      });
    }

    try {
      // First find the pet to get the owner ID
      const pet = await Pet.findById(req.params.id);
      if (!pet) {
        return res.status(404).json({ success: false, message: "Animal non trouvé" });
      }

      // Update the pet
      const updatedPet = await Pet.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true }
      );

      // Fetch the updated pet with populated owner data
      const populatedPet = await Pet.findById(updatedPet._id)
        .populate("owner", "firstName lastName address city telephone");

      res.json({ 
        success: true, 
        data: populatedPet 
      });
    } catch (err) {
      next(err);
    }
  }
);

// Delete a pet
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Format d'ID invalide"
      });
    }

    // Find the pet first to get the owner ID
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Animal non trouvé"
      });
    }

    const ownerId = pet.owner;

    // Delete the pet
    await Pet.findByIdAndDelete(id);

    // Update owner's pets array
    await Owner.findByIdAndUpdate(ownerId, {
      $pull: { pets: id }
    });

    res.json({
      success: true,
      message: "Animal supprimé avec succès"
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'animal:', error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de l'animal"
    });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const pets = await Pet.find().populate("owner", "firstName lastName");
    res.json({ success: true, data: pets });
  } catch (err) {
    next(err);
  }
});

module.exports = router;