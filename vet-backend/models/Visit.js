const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  date: { 
    type: Date, 
    default: Date.now // <-- Default ajouté ici
  },
  description: { 
    type: String, 
    required: [true, "La description est obligatoire"] 
  },
  pet: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Pet",
    required: true
  }
});

module.exports = mongoose.model("Visit", visitSchema); 