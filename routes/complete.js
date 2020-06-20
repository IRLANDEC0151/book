const { Router } = require("express");
const router = Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  
  
  res.render("complete", {
    title: "Регистрация прошла успешно",
    user: req.user.toObject(),
  });
  console.log('тут');
  
});
module.exports = router;
