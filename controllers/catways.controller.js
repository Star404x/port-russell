const Catway = require("../models/Catway");

/**
 * GET /catways
 * - HTML: render list
 * - JSON: return catways
 */
exports.list = async (req, res) => {
  const catways = await Catway.find().sort({ catwayNumber: 1 });

  // Détection explicite du JSON
  const wantsJson =
    req.headers.accept && req.headers.accept.includes("application/json");

  if (wantsJson) {
    return res.json(catways);
  }

  return res.render("catways/list", { catways });
};

/**
 * GET /catways/:id
 */
exports.details = async (req, res) => {
  const id = Number(req.params.id);
  const catway = await Catway.findOne({ catwayNumber: id });
  if (!catway) return res.status(404).send("Catway not found");

  if (req.accepts("json") && !req.accepts("html")) return res.json(catway);
  return res.render("catways/details", { catway });
};

/**
 * GET /catways/new (HTML form)
 */
exports.newForm = async (req, res) => {
  return res.render("catways/form", {
    mode: "create",
    catway: null,
    error: null,
  });
};

/**
 * POST /catways
 */
exports.create = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;
    const created = await Catway.create({
      catwayNumber: Number(catwayNumber),
      catwayType,
      catwayState,
    });

    if (req.accepts("json") && !req.accepts("html"))
      return res.status(201).json(created);
    return res.redirect("/catways");
  } catch (err) {
    console.error(err);
    return res.status(400).render("catways/form", {
      mode: "create",
      catway: req.body,
      error: "Création impossible (vérifie numéro unique / champs requis).",
    });
  }
};

/**
 * GET /catways/:id/edit (HTML form)
 * Only catwayState should be editable.
 */
exports.editForm = async (req, res) => {
  const id = Number(req.params.id);
  const catway = await Catway.findOne({ catwayNumber: id });
  if (!catway) return res.status(404).send("Catway not found");
  return res.render("catways/form", { mode: "edit", catway, error: null });
};

/**
 * PUT /catways/:id
 * Only updates catwayState.
 */
exports.update = async (req, res) => {
  const id = Number(req.params.id);
  const { catwayState } = req.body;

  const updated = await Catway.findOneAndUpdate(
    { catwayNumber: id },
    { $set: { catwayState } },
    { new: true }
  );

  if (!updated) return res.status(404).send("Catway not found");

  if (req.accepts("json") && !req.accepts("html")) return res.json(updated);
  return res.redirect(`/catways/${id}`);
};

/**
 * DELETE /catways/:id
 */
exports.remove = async (req, res) => {
  const id = Number(req.params.id);
  const deleted = await Catway.findOneAndDelete({ catwayNumber: id });

  if (!deleted) return res.status(404).send("Catway not found");

  if (req.accepts("json") && !req.accepts("html"))
    return res.status(204).send();
  return res.redirect("/catways");
};
