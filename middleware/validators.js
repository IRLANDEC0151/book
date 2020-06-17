const { body } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.registerValidators = [
  body("email")
    .isEmail()
    .withMessage("Некорректный email")
    .custom(async (value, req) => {
      try {
        const candidate = await User.findOne({ email: value });
        if (candidate) {
          return Promise.reject("Пользователь с таким email уже существует");
        }
      } catch (error) {
        console.log(error);
      }
    })
    .normalizeEmail(),
  body("password", "Слишком короткий пароль").isLength({ min: 8 }).trim(),
  body("confirm").custom((value, { req }) => {
    console.log(req.body.password);
    console.log(value);

    if (value !== req.body.password) {
      throw new Error("Пароли должны совпадать");
    }
    return true;
  }),
];
exports.bookValidators = [
  body('genre').isAlpha(['ru-RU']).withMessage('Жанр должен содержать только буквы')
]; 
