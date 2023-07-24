const express = require("express");
const router = express.Router();
const passport = require("passport");
var userProfile;

router.get("/me", (req, res, next) => {
  res.send(req.session);
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_RURL = process.env.CALLBACK_URL
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_RURL,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      request.session.user = profile;
      request.session.save();
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/error/login" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect("/");
  }
);
module.exports = router;
