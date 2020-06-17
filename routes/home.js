const { Router } = require("express");
const jsonParser = require("express").json();
const router = Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { registerValidators } = require("../middleware/validators");
const { bookValidators } = require("../middleware/validators");
router.get("/", (req, res) => {
  res.render("home", {
    title: "Перекресток книг - найди любую книгу в своем городе!",
    style: "/home.css",
    script: "/home.js",
  });
});

router.post("/", jsonParser, registerValidators, async (req, res) => {
  console.log(req.body);
  try {
    const { email, password, confirm } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.body.error = errors.array()[0].msg;
      console.log("ошибка регистрации");
      return res.json(req.body);
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashPassword,
    });
    await user.save();
    const candidate = await User.findOne({ email: email });
    req.session.user = candidate;
    req.session.isAuthenticated = true;
    req.session.save();
    res.redirect("/complete");

    console.log("пользователь зарегистрирован");
  } catch (error) {
    console.log("Пользователь не зарегистрирован");
    console.log(error);
  }
});

router.post("/postBook", jsonParser, bookValidators, async (req, res) => {
  console.log(req.body);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("ошибка в книге");
      return res.json({ error: errors.array()[0].msg });
    }
    res.json({});
  } catch (error) {
    console.log("Книга не зарегистрированная");
    console.log(error);
  }
});

module.exports = router;
