function ensureAuth(req, res, next) {
  if (req.session?.user) {
    return next();
  }

  // Si la requête demande du JSON → réponse API
  const wantsJson =
    req.headers.accept && req.headers.accept.includes("application/json");

  if (wantsJson) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Sinon HTML → redirection login
  return res.redirect("/");
}

module.exports = { ensureAuth };
