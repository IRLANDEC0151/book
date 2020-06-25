const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const Book = require("../models/book");

router.get("/", auth.auth, async (req, res) => {
  const user = await req.user.populate("books").execPopulate();
  const book = mapCartItems(user.books);
 
  res.render("profile/profile", {
    title: "Профиль",
    user: req.user.toObject(),
    style: "/profile.css",
    script: "/profile.js",
    book: book,
  });
});
router.get("/settings",(req, res)=>{
  res.render("profile/settings", {
    title: "Настройки профиля",
    user: req.user.toObject(),
    style: "/settings.css",
  });
})

function mapCartItems(cart) {
  return cart.map((c) => ({
    bookName: c.bookName,
    author: c.author,
    genre: c.genre,
  }));
}
module.exports = router;
