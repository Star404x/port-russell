require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user");

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);

  const exists = await User.findOne({ email: "admin@port-russell.fr" });
  if (exists) {
    console.log("Admin déjà existant");
    process.exit(0);
  }

  await User.create({
    username: "admin",
    email: "admin@port-russell.fr",
    password: "Admin123!",
  });

  console.log("Admin créé avec succès");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
