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

// Reservations list
const Reservation = require("./models/Reservation");
app.get("/reservations", ensureAuth, async (req, res) => {
  const reservations = await Reservation.find().sort({ startDate: 1 });
  res.render("reservations/all", { reservations });
});

app.get("/reservations/new", ensureAuth, (req, res) => {
  res.render("reservations/form_global", { error: null, reservation: null });
});

// Expose user to views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  next();
});

// Home
app.get("/", (req, res) => {
  res.render("home");
});

// Dashboard
app.get("/dashboard", ensureAuth, async (req, res) => {
  const today = new Date();

  // Début de journée (pour comparaison stable)
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const endOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    23,
    59,
    59,
    999
  );

  const activeReservations = await Reservation.find({
    startDate: { $lte: endOfToday },
    endDate: { $gte: startOfToday },
  }).sort({ startDate: 1 });

  res.render("dashboard", { today, activeReservations });
});

// Docs
app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "docs", "api.md"));
});

// Routes
app.use("/", authRoutes);
app.use("/catways", ensureAuth, catwaysRoutes);

module.exports = app;
