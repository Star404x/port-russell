const router = require("express").Router({ mergeParams: true });
const r = require("../controllers/reservations.controller");

router.get("/", r.list);
router.get("/new", r.newForm);
router.post("/", r.create);

router.get("/:idReservation", r.details);
router.get("/:idReservation/edit", r.editForm);
router.put("/:idReservation", r.update);
router.delete("/:idReservation", r.remove);

module.exports = router;
