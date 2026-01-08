const mongoose = require("mongoose");

/**
 * Connect to MongoDB
 * @returns {Promise<void>}
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI in env.");

  await mongoose.connect(uri);
  console.log("MongoDB connected");
}

module.exports = { connectDB };
