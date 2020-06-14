const path = require("path");
const express = require("express");
//шаблонизатор
const exphbs = require("express-handlebars");

//подключаем роутеры
const homeRoutes = require("./routes/home");
const PORT = process.env.PORT || 8080;

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});
//регистрируем движок
app.engine("hbs", hbs.engine);
//используем движок
app.set("view engine", "hbs");
//место где лежат наши шаблоны
app.set("views", "views");

//регистрируем доступ к  css и js
app.use(
  express.static(path.join(__dirname, "public", "css")),
  express.static(path.join(__dirname, "public", "img")),
  express.static(path.join(__dirname, "public", "js"))
);

//чтобы работал req.body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/", homeRoutes);

function start() {
  app.listen(PORT, () => {
    console.log(`Сервер запущен: ${PORT} `);
  });
}
start();
