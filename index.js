const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("req-flash");
const app = express();

const pupukRoutes = require("./src/routes/router-pupuk");
const bibitRoutes = require("./src/routes/router-bibit");
const appRoutes = require("./src/routes/router-app");


app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: "0ke123",
      name: "secretName",
      cookie: {
        sameSite: true,
        maxAge: 60000,
      },
    })
  );
  
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(flash());
  
  app.use(function (req, res, next) {
    res.setHeader(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    res.setHeader("Pragma", "no-cache");
    next();
  });
  
  // Setting folder views mengkoneksikan dengan views
  app.set("views", path.join(__dirname, "src/views"));
  app.set("view engine", "ejs");
  
  // Gunakan routes yang telah didefinisikan pupuk dan bibit serta app nya
  app.use("/pupuk", pupukRoutes);
  app.use("/bibit", bibitRoutes);
  app.use("/", appRoutes);
  
  console.log(app._router.stack);
  
  // Gunakan port server 5050
  app.listen(5050, () => {
    console.log("Server Berjalan di Port : " + 5050);
  });
  