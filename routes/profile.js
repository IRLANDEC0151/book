const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const Book = require("../models/book");
const User = require("../models/user");

router.get("/", auth.auth, async (req, res) => {
  const user = await req.user.populate("books").execPopulate();
  const book = mapBookItems(user.books);
  book.length = user.books.length;

  res.render("profile/profile", {
    title: "Профиль",
    user: req.user.toObject(),
    style: "/profile.css",
    script: "/profile.js",
    book: book,
  });
});
router.get("/settings", async (req, res) => {
  const candidate = await req.user.populate("placeId").execPopulate();
  const candidateLink = mapLinkItems(candidate.userLink);
  res.render("profile/settings", {
    title: "Настройки профиля",
    user: req.user.toObject(),
    style: "/settings.css",
    address: candidate.placeId.address,
    link: candidateLink,
  });
});
router.get("/addBook", async (req, res) => {
  res.render("profile/addBook", {
    title: "Настройки профиля",
    user: req.user.toObject(),
    style: "/addBook.css",
    script: "/addBook.js",
  });
});
router.post("/addBook", async (req, res) => {
  try {
    let i = 0;
    const candidate = await User.findOne({ email: req.user.email });
    const book = new Book(req.body);
    book.userId = candidate._id;
    await book.save();
    candidate.books.push(book);
    await candidate.save();
    console.log("добавление книги прошло успешно");
    res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
});

router.post("/deleteBook", async (req, res) => {
  try {
    const candidate = await User.findOne({ email: req.user.email });
    candidate.books.splice(candidate.books.indexOf(req.body._id), 1);
    await candidate.save();
    await Book.deleteOne({
      _id: req.body._id,
      userId: req.user._id,
    });
    res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
});

function mapBookItems(book) {
  return book.map((b) => ({
    bookName: b.bookName,
    author: b.author,
    genre: b.genre,
    _id: b._id,
  }));
}
function mapLinkItems(link) {
  return link.map((l) => ({
    userLink: l,
  }));
}
module.exports = router;
