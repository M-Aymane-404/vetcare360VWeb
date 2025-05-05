const express = require("express");
const router = express.Router();
const { param } = require("express-validator");

const { body, validationResult } = require("express-validator");
const Owner = require("../models/Owner");

router.post(
  "/",
  [
    body("firstName").notEmpty().withMessage("Le prénom est requis"),
    body("lastName").notEmpty().withMessage("Le nom est requis"),
    body("address").notEmpty().withMessage("L'adresse est requise"),
    body("city").notEmpty().withMessage("La ville est requise"),
    body("telephone")
      .notEmpty().withMessage("Le téléphone est requis")
      .isMobilePhone().withMessage("Numéro de téléphone invalide")
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
      const owner = new Owner(req.body);
      await owner.save();
      res.status(201).json({
        success: true,
        data: owner
      });
    } catch (err) {
      next(err); 
    }
  }
);

// Lister tous les propriétaires (GET)
router.get("/", async (req, res, next) => {
  try {
    const owners = await Owner.find().populate("pets");
    res.json({
      success: true,
      data: owners
    });
  } catch (err) {
    next(err);
  }
});

// Recherche de propriétaires par nom
router.get("/search", async (req, res, next) => {
  try {
    const { lastName } = req.query;
    if (!lastName) {
      return res.status(400).json({ 
        success: false,
        message: "Le paramètre 'lastName' est requis." 
      });
    }
    const owners = await Owner.find({ lastName: new RegExp(lastName, "i") });
    res.json({
      success: true,
      data: owners
    });
  } catch (err) {
    next(err);
  }
});

// Obtenir un propriétaire par ID 
router.get("/:id",
  [
    param("id").isMongoId().withMessage("ID invalide")
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
      const owner = await Owner.findById(req.params.id)
      .populate({
        path: "pets",
        populate: {
          path: "visits",
          select: "date description" 
        }
      });
      if (!owner) {
        return res.status(404).json({
          success: false,
          message: "Propriétaire introuvable"
        });
      }

      res.json({
        success: true,
        data: owner
      });
    } catch (err) {
      next(err);
    }
  }
);


router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("ID invalide"),
    body("firstName").optional().notEmpty().withMessage("Prénom requis"),
    body("lastName").optional().notEmpty().withMessage("Nom requis"),
    body("telephone").optional().isMobilePhone().withMessage("Téléphone invalide")
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const updatedOwner = await Owner.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });
      if (!updatedOwner) {
        return res.status(404).json({ success: false, message: "Propriétaire introuvable" });
      }
      res.json({ success: true, data: updatedOwner });
    } catch (err) {
      next(err);
    }
  }
);




module.exports = router;