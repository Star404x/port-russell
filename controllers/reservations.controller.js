const Reservation = require("../models/Reservation");

/**
 * GET /catways/:id/reservations
 * List reservations for a catway (HTML or JSON)
 */
exports.list = async (req, res) => {
  const catwayNumber = Number(req.params.id);
  const reservations = await Reservation.find({ catwayNumber }).sort({
    startDate: 1,
  });

  const wantsJson = req.headers.accept?.includes("application/json");
  if (wantsJson) return res.json(reservations);

  return res.render("reservations/list", { catwayNumber, reservations });
};

/**
 * GET /catways/:id/reservations/:idReservation
 */
exports.details = async (req, res) => {
  const catwayNumber = Number(req.params.id);
  const { idReservation } = req.params;

  const reservation = await Reservation.findOne({
    _id: idReservation,
    catwayNumber,
  });
  if (!reservation) return res.status(404).send("Reservation not found");

  const wantsJson = req.headers.accept?.includes("application/json");
  if (wantsJson) return res.json(reservation);

  return res.render("reservations/details", { catwayNumber, reservation });
};

/**
 * GET /catways/:id/reservations/new
 */
exports.newForm = async (req, res) => {
  const catwayNumber = Number(req.params.id);
  return res.render("reservations/form", {
    mode: "create",
    catwayNumber,
    reservation: null,
    error: null,
  });
};

/**
 * POST /catways/:id/reservations
 */
exports.create = async (req, res) => {
  try {
    const catwayNumber = Number(req.params.id);
    const { clientName, boatName, startDate, endDate } = req.body;

    const created = await Reservation.create({
      catwayNumber,
      clientName,
      boatName,
      startDate,
      endDate,
    });

    const wantsJson = req.headers.accept?.includes("application/json");
    if (wantsJson) return res.status(201).json(created);

    return res.redirect(`/catways/${catwayNumber}/reservations`);
  } catch (err) {
    console.error(err);
    const catwayNumber = Number(req.params.id);
    return res.status(400).render("reservations/form", {
      mode: "create",
      catwayNumber,
      reservation: req.body,
      error: "Création impossible (vérifie les champs et les dates).",
    });
  }
};

/**
 * GET /catways/:id/reservations/:idReservation/edit
 */
exports.editForm = async (req, res) => {
  const catwayNumber = Number(req.params.id);
  const { idReservation } = req.params;

  const reservation = await Reservation.findOne({
    _id: idReservation,
    catwayNumber,
  });
  if (!reservation) return res.status(404).send("Reservation not found");

  return res.render("reservations/form", {
    mode: "edit",
    catwayNumber,
    reservation,
    error: null,
  });
};

/**
 * PUT /catways/:id/reservations/:idReservation
 */
exports.update = async (req, res) => {
  try {
    const catwayNumber = Number(req.params.id);
    const { idReservation } = req.params;

    const { clientName, boatName, startDate, endDate } = req.body;

    const updated = await Reservation.findOneAndUpdate(
      { _id: idReservation, catwayNumber },
      { $set: { clientName, boatName, startDate, endDate } },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).send("Reservation not found");

    const wantsJson = req.headers.accept?.includes("application/json");
    if (wantsJson) return res.json(updated);

    return res.redirect(
      `/catways/${catwayNumber}/reservations/${idReservation}`
    );
  } catch (err) {
    console.error(err);
    const catwayNumber = Number(req.params.id);
    return res.status(400).render("reservations/form", {
      mode: "edit",
      catwayNumber,
      reservation: { ...req.body, _id: req.params.idReservation },
      error: "Modification impossible (vérifie les champs et les dates).",
    });
  }
};

/**
 * DELETE /catways/:id/reservations/:idReservation
 */
exports.remove = async (req, res) => {
  const catwayNumber = Number(req.params.id);
  const { idReservation } = req.params;

  const deleted = await Reservation.findOneAndDelete({
    _id: idReservation,
    catwayNumber,
  });
  if (!deleted) return res.status(404).send("Reservation not found");

  const wantsJson = req.headers.accept?.includes("application/json");
  if (wantsJson) return res.status(204).send();

  return res.redirect(`/catways/${catwayNumber}/reservations`);
};
