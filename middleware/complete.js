exports.isComplete = function (req, res, next) {

  if (!global.isComplete) {
    return res.redirect("/");
  }

  next();
 }; 
