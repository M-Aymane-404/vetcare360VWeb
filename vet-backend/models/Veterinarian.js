const mongoose = require("mongoose");

const veterinarianSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Le nom est obligatoire"] // Validation améliorée
  },
  specialties: [String]
});

module.exports = mongoose.model("Veterinarian", veterinarianSchema); // Export correct