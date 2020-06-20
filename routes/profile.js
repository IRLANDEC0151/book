const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");

router.get("/",auth.auth,    (req, res) => {
  res.render("profile", {
    title: "Профиль",
    user: req.user.toObject(),
  }); 
});
module.exports = router;