const router = require("express").Router();
const authController = require("../controllers/auth.controller");

/**
 * POST /login
 */
router.post("/login", authController.login);

/**
 * GET /logout
 */
router.get("/logout", authController.logout);

module.exports = router;
