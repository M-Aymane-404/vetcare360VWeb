require('dotenv').config();
const mongoose = require('mongoose');
const Pet = require('./models/Pet');
const Owner = require('./models/Owner');

async function seedPets() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const owners = await Owner.find();

    const pets = [
      { name: "Rex", birthDate: "2022-04-01", type: "dog", owner: owners[0]._id },
      { name: "Mimi", birthDate: "2021-06-15", type: "cat", owner: owners[1]._id },
    ];

    await Pet.deleteMany();
    const result = await Pet.insertMany(pets);
    console.log(" Animaux insérés :", result.length);
    process.exit(0);
  } catch (err) {
    console.error(" Erreur seedPets:", err.message);
    process.exit(1);
  }
}

seedPets();
