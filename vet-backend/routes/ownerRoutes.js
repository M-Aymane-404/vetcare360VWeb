const express = require("express");
const router = express.Router();
const { param } = require("express-validator");

const { body, validationResult } = require("express-validator");
const Owner = require("../models/Owner");
const Pet = require("../models/Pet");
const Visit = require("../models/Visit");

// Route de test
router.get("/test", (req, res) => {
  console.log("Route de test /api/owners/test appelée");
  res.json({ success: true, message: "Route de test fonctionnelle" });
});

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

// Supprimer un propriétaire et ses données associées
router.delete(
  "/:id",
  [
    param("id").isMongoId().withMessage("ID invalide")
  ],
  async (req, res, next) => {
    console.log('Requête DELETE reçue pour l\'ID:', req.params.id);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Erreurs de validation:', errors.array());
      return res.status(400).json({
        success: false,
        errors: errors.array().map(e => ({ champ: e.path, message: e.msg }))
      });
    }

    try {
      // Trouver le propriétaire et ses animaux
      const owner = await Owner.findById(req.params.id).populate('pets');
      console.log('Propriétaire trouvé:', owner ? 'Oui' : 'Non');
      
      if (!owner) {
        console.log('Propriétaire non trouvé');
        return res.status(404).json({
          success: false,
          message: "Propriétaire introuvable"
        });
      }

      // Supprimer toutes les visites des animaux du propriétaire
      if (owner.pets && owner.pets.length > 0) {
        console.log('Suppression des visites pour', owner.pets.length, 'animaux');
        for (const pet of owner.pets) {
          await Visit.deleteMany({ pet: pet._id });
        }
      }

      // Supprimer tous les animaux du propriétaire
      console.log('Suppression des animaux du propriétaire');
      await Pet.deleteMany({ owner: owner._id });

      // Supprimer le propriétaire
      console.log('Suppression du propriétaire');
      const deletedOwner = await Owner.findByIdAndDelete(req.params.id);
      
      if (!deletedOwner) {
        console.log('Échec de la suppression du propriétaire');
        return res.status(500).json({
          success: false,
          message: "Échec de la suppression du propriétaire"
        });
      }

      console.log('Suppression réussie');
      res.json({
        success: true,
        message: "Propriétaire et données associées supprimés avec succès"
      });
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      next(err);
    }
  }
);

module.exports = router;