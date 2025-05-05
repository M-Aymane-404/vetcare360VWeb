const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true , index: true},
  address: String,
  city: String,
  telephone: { type: String, required: true },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }] // Référence aux animaux
});

module.exports = mongoose.model("Owner", ownerSchema);