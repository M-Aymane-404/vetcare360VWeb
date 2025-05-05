require('dotenv').config();
const mongoose = require('mongoose');
const Visit = require('./models/Visit');
const Pet = require('./models/Pet');

async function seedVisits() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const pets = await Pet.find();

    const visits = [
      { pet: pets[0]._id, description: "Vaccination annuelle", date: new Date("2023-09-01") },
      { pet: pets[1]._id, description: "Vérification puce électronique", date: new Date("2023-10-05") },
    ];

    await Visit.deleteMany();
    const result = await Visit.insertMany(visits);
    console.log("📅 Visites insérées :", result.length);
    process.exit(0);
  } catch (err) {
    console.error("❌ Erreur seedVisits:", err.message);
    process.exit(1);
  }
}

seedVisits();
