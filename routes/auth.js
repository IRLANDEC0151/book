const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const { validationResult } = require("express-validator");
const { loginValidators } = require("../middleware/validators");
const { registerValidators } = require("../middleware/validators");

const User = require("../models/user");

router.get("/login", auth.profile, (req, res) => {
  res.render("auth/login", {
    title: "Вход в личный кабинет",
    style: "/login.css",
  });
});
//обработка захода пользователя
router.post("/login", auth.profile, loginValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("loginError", errors.array()[0].msg);
      return res.status(422).render("auth/login", {
        title: "Вход в личный кабинет",
        loginError: req.flash("loginError"),
        style: "/login.css",
        dataInput: {
          email: req.body.email,
        },
      });
    }
    const candidate = await User.findOne({ email: req.body.email });
    req.session.user = candidate;
    req.session.isAuthenticated = true;
    req.session.save((err) => {
      if (err) throw err;
      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/register", auth.profile, (req, res) => {
  res.render("auth/register", {
    title: "Регистрация",
    style: "/register.css",
  });
});

router.post("/register", registerValidators, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Ошибка регистрации");
      req.flash("registerError", errors.array()[0].msg);
      return res.status(422).render("auth/register", {
        title: "Регистрация",
        registerError: req.flash("registerError"),
        style: "/register.css",
        dataInput: {
          email: req.body.email,
        },
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      name,
      password: hashPassword,
    });
    await user.save();

    req.session.user = user;
    req.session.isAuthenticated = true;
    req.session.save(async (err) => {
      if (err) throw err;
      console.log("Пользователь зарегистрирован");
      res.redirect("/");
    });
  } catch (error) {
    console.log("Пользователь не зарегистрирован");
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});
module.exports = router;
