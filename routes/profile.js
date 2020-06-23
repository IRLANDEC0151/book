const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const Book = require("../models/book");

router.get("/", auth.auth, async (req, res) => {
  const user = await req.user.populate("books").execPopulate();
  const book = mapCartItems(user.books);
 
  res.render("profile", {
    title: "Профиль",
    user: req.user.toObject(),
    style: "/profile.css",
    book: book,
  });
});

function mapCartItems(cart) {
  return cart.map((c) => ({
    bookName: c.bookName,
    author: c.author,
    genre: c.genre,
  }));
}
module.exports = router;
