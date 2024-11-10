import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import axios from "axios";
import passport from "passport";
import dotenv from "dotenv";
import { Strategy } from "passport-local";
import connectPgSimple from "connect-pg-simple";
import db from "./db.js";
import User from "./models/User.js";

import homeRoutes from "./routes/homeRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const pgSession = connectPgSimple(session);
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public/"));

const store = new pgSession({
  pool: db, // Your DB
  tableName: "user_session", // Table name for sessions
  createTableIfMissing: true, // If table is missing it will automatically create one in db
  pruneSessionInterval: 60, // Automatically delete expired sessions every 60 seconds
});

app.use(
  session({
    secret: "SIGNEDCOOKIES",
    resave: false,
    saveUninitialized: false,
    store: store, // Store in DB
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", homeRoutes);
app.get("/about", homeRoutes);
app.get("/login", authRoutes);
app.post("/login", authRoutes);
app.get("/logout", authRoutes);
app.get("/dashboard", authRoutes);

passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const user = await User.findAcc({ username });
      if (!user) {
        return cb(null, false, { message: "Wrong Email." });
      } else {
        const isValidPassword = await User.verifyPassword(
          password,
          user.password
        );
        console.log(isValidPassword);
        if (isValidPassword) {
          return cb(null, user);
        } else {
          return cb(null, false, { message: "Wrong Password." });
        }
      }
    } catch (error) {
      return cb(error);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(process.env.BK_PORT || 3000);
