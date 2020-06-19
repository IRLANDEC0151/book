const { Router } = require("express");
const jsonParser = require("express").json();
const router = Router();
const User = require("../models/user");
const Book = require("../models/book");
const Place = require("../models/place");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { registerValidators } = require("../middleware/validators");
router.get("/", (req, res) => {
  res.render("home", {
    title: "Перекресток книг - найди любую книгу в своем городе!",
    style: "/home.css",
    script: "/home.js",
  });
});

router.post("/", jsonParser, registerValidators, async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.body.error = errors.array()[0].msg;
      console.log("ошибка регистрации");
      return res.json(req.body);
    }
    req.body.password = await bcrypt.hash(password, 12);
    const user = new User(req.body);
    await user.save();
    req.session.user = user;
    req.session.isAuthenticated = true;
    req.session.save();
    console.log("пользователь зарегистрирован");

    await createPlace(user, req.body.place);
    res.redirect("/complete");
  } catch (error) {
    console.log("Пользователь не зарегистрирован");
    console.log(error);
  }
});

router.post("/postBook", jsonParser, async (req, res) => {
  try {
    const candidate = await User.findOne({ email: req.user.email });
    const book = new Book(req.body);
    book.userId = candidate._id;
    await book.save();
    candidate.books.push(book);
    await candidate.save();
    console.log("создание книги прошло успешно");
    res.json(req.body);
  } catch (error) {
    console.log("Книга не зарегистрированная");
    console.log(error);
  }
});

//создаем place
async function createPlace(user, address) {
  const place = new Place({
    address: address,
    userId: user._id,
  });
  await place.save();
  user.placeId = place._id;
  await user.save();
  console.log("place создан");
}
module.exports = router;
