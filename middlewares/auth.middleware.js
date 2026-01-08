/**
 * Ensure user is authenticated.
 */
function ensureAuth(req, res, next) {
  if (req.session?.user) return next();
  return res.redirect("/");
}

module.exports = { ensureAuth };
