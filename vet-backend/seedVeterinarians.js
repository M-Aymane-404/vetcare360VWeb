require('dotenv').config();
const mongoose = require('mongoose');
const Veterinarian = require('./models/Veterinarian');

const vets = [
  { name: "James Carter", specialties: [] },
  { name: "Linda Douglas", specialties: ["dentistry", "surgery"] },
  { name: "Sharon Jenkins", specialties: [] },
  { name: "Helen Leary", specialties: ["radiology"] },
  { name: "Rafael Ortega", specialties: ["surgery"] },
  { name: "Henry Stevens", specialties: ["radiology"] }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Connecté à MongoDB");

    await Veterinarian.deleteMany({});
    console.log(" Données précédentes supprimées");

    await Veterinarian.insertMany(vets);
    console.log(" Vétérinaires ajoutés avec succès");

    process.exit(0);
  } catch (err) {
    console.error(" Erreur lors du seeding :", err.message);
    process.exit(1);
  }
}

seedDatabase();
