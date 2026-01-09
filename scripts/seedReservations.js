require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Reservation = require("../models/Reservation");

function normalizeReservation(r) {
  // On supporte plusieurs formats possibles (selon ton fichier)
  return {
    catwayNumber: Number(
      r.catwayNumber ?? r.catwayId ?? r.catway ?? r.catway_number ?? r.catway
    ),
    clientName: r.clientName ?? r.client ?? r.customerName ?? "Client inconnu",
    boatName: r.boatName ?? r.boat ?? r.boat_name ?? "Bateau inconnu",
    startDate: new Date(r.startDate ?? r.start ?? r.dateStart),
    endDate: new Date(r.endDate ?? r.end ?? r.dateEnd),
  };
}

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);

  const filePath = path.join(__dirname, "..", "data", "reservations.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  const docs = (Array.isArray(data) ? data : []).map(normalizeReservation);

  // Safety: filtre les enregistrements invalides
  const valid = docs.filter(
    (d) =>
      Number.isFinite(d.catwayNumber) &&
      d.clientName &&
      d.boatName &&
      d.startDate instanceof Date &&
      !isNaN(d.startDate) &&
      d.endDate instanceof Date &&
      !isNaN(d.endDate) &&
      d.endDate >= d.startDate
  );

  await Reservation.deleteMany({});
  await Reservation.insertMany(valid);

  console.log("Reservations seed OK :", valid.length);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
