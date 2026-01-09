const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
  {
    catwayNumber: { type: Number, required: true, index: true },
    clientName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    boatName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

// Validation simple : endDate >= startDate
ReservationSchema.pre("validate", function (next) {
  if (this.startDate && this.endDate && this.endDate < this.startDate) {
    return next(new Error("endDate must be >= startDate"));
  }
  next();
});

module.exports = mongoose.model("Reservation", ReservationSchema);
