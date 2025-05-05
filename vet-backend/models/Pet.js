// models/Pet.js
const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthDate: Date,
  type: { type: String, enum: ["dog", "cat", "bird", "hamster", "lizard"] , index: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
  visits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Visit" }]
});

// Exportez le modèle avec le nom EXACT "Pet"
module.exports = mongoose.model("Pet", petSchema); // <-- Nom crucial !