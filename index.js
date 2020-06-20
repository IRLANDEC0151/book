const path = require("path");
const express = require("express");
//шаблонизатор
const exphbs = require("express-handlebars");
//сессия пользователя
const session = require("express-session");
//сессии в mongoDB
const MongoStore = require("connect-mongodb-session")(session);
//mongoose 
const mongoose = require("mongoose");
//для защиты frontend
const csrf = require("csurf");
const varMiddleWare = require("./middleware/variables");
const userMiddleWare = require("./middleware/user");
//подключаем роутеры
const homeRoutes = require("./routes/home");
const completeRoutes = require("./routes/complete");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const PORT = process.env.PORT || 8080;

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});
const store = new MongoStore({
  collection: "sessions",
  uri: 'mongodb+srv://Irlandec:GeMHhfW0ES0JxcIt@cluster0-eoeu8.mongodb.net/Book?retryWrites=true&w=majority',
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
//сессия пользователя 
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  }) 
);
app.use(csrf());
app.use(varMiddleWare);
app.use(userMiddleWare);
app.use("/complete", completeRoutes);  
app.use("/", homeRoutes);
app.use("/auth", authRoutes);  
app.use("/profile", profileRoutes);  

async function start() {
  try {
    await mongoose.connect('mongodb+srv://Irlandec:GeMHhfW0ES0JxcIt@cluster0-eoeu8.mongodb.net/Book?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
    });
    console.log("Mongoose запущен");

    app.listen(PORT, () => {
      console.log(`Сервер запущен: ${PORT} `);
    });
  } catch (error) { 
    console.log("Ooops");
    console.log(error);   
  }
} 
start();
  