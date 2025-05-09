require('dotenv').config();
const mongoose = require('mongoose');
const Owner = require('./models/Owner');

const owners = [
  { firstName: "Jean", lastName: "Dupont", address: "12 rue Victor Hugo", city: "Paris", telephone: "0601020304" },
  { firstName: "Claire", lastName: "Martin", address: "25 avenue République", city: "Lyon", telephone: "0611121314" },
];

async function seedOwners() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Owner.deleteMany();
    const result = await Owner.insertMany(owners);
    console.log(" Propriétaires insérés :", result.length);
    process.exit(0);
  } catch (err) {
    console.error(" Erreur seedOwners:", err.message);
    process.exit(1);
  }
}

seedOwners();
