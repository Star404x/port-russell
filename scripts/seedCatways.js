require("dotenv").config();
const mongoose = require("mongoose");
const Catway = require("../models/Catway");

const catways = [
  { catwayNumber: 1, catwayType: "long", catwayState: "Bon état" },
  { catwayNumber: 2, catwayType: "short", catwayState: "Éclairage à vérifier" },
  {
    catwayNumber: 3,
    catwayType: "long",
    catwayState: "Planches glissantes côté est",
  },
  { catwayNumber: 4, catwayType: "short", catwayState: "Rien à signaler" },
  {
    catwayNumber: 5,
    catwayType: "long",
    catwayState: "Main courante à resserrer",
  },
];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);

  // Remplace toutes les données (pratique en dev)
  await Catway.deleteMany({});
  await Catway.insertMany(catways);

  console.log("Catways seed OK :", catways.length);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
