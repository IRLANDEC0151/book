exports.isComplete = function (req, res, next) {
  console.log(global.isComplete);
  console.log("сначала туты");

  if (!global.isComplete) {
    return res.redirect("/");
  }

  next();
  global.isComplete = false;
  console.log("тут");
 }; 
