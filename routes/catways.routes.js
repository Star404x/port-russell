const router = require("express").Router();
const c = require("../controllers/catways.controller");
const reservationsRoutes = require("./reservations.routes");

// REST

router.get("/", c.list);
router.get("/new", c.newForm);
router.post("/", c.create);

// Sous-ressource reservations
router.use("/:id/reservations", reservationsRoutes);

router.get("/:id", c.details);
router.get("/:id/edit", c.editForm);
router.put("/:id", c.update);
router.delete("/:id", c.remove);

module.exports = router;
