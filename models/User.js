const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, minlength: 2 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 8 },
  },
  { timestamps: true }
);

/**
 * Hash password before saving.
 */
UserSchema.pre("save", async function preSave(next) {
  if (!this.isModified("password")) return next();
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

/**
 * Compare a plain password with the hashed one.
 * @param {string} plainPassword
 * @returns {Promise<boolean>}
 */
UserSchema.methods.comparePassword = function comparePassword(plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
