const router = require("express").Router();
const c = require("../controllers/catways.controller");

// REST
router.get("/", c.list);
router.get("/new", c.newForm);
router.post("/", c.create);

router.get("/:id", c.details);
router.get("/:id/edit", c.editForm);
router.put("/:id", c.update);
router.delete("/:id", c.remove);

module.exports = router;
