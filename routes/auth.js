const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");

router.get("/login", auth.profile, (req, res) => {
  res.render("auth/login", {
    title: "Вход в личный кабинет",
  });  
});
module.exports = router;