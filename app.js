const express = require("express");
const path = require("path");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");

const { connectDB } = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const catwaysRoutes = require("./routes/catways.routes");
const { ensureAuth } = require("./middlewares/auth.middleware");

const app = express();

// DB
connectDB().catch((err) => {
  console.error(err);
  process.exit(1);
});

// Views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
);

// Expose user to views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// Home
app.get("/", (req, res) => {
  res.render("home");
});

// Dashboard (simple)
app.get("/dashboard", ensureAuth, (req, res) => {
  const today = new Date();
  res.render("dashboard", { today });
});

// Docs
app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "docs", "api.md"));
});

// Routes
app.use("/", authRoutes);
app.use("/catways", ensureAuth, catwaysRoutes);

module.exports = app;
