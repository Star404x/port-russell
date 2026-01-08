const User = require("./models/User");

/**
 * Handle login (session-based).
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: (email || "").toLowerCase().trim(),
    });
    if (!user)
      return res
        .status(401)
        .render("home", { error: "Identifiants invalides." });

    const ok = await user.comparePassword(password || "");
    if (!ok)
      return res
        .status(401)
        .render("home", { error: "Identifiants invalides." });

    req.session.user = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    };
    return res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    return res.status(500).render("home", { error: "Erreur serveur." });
  }
};

/**
 * Handle logout.
 */
exports.logout = async (req, res) => {
  req.session.destroy(() => res.redirect("/"));
};
