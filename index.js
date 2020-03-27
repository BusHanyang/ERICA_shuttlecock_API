const express = require("express");
const app = express();
const helmet = require("helmet");

app.use(helmet());
app.use(helmet.noCache());

/*middle ware*/
app.use(express.static(__dirname + "/public"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET"); //POST, PUT, DELETE 는 구현하지 않음.
  res.header("Access-Control-Allow-Headers", "content-type");
  next();
});

/* router */
var routes = require("./router/routes");
routes(app);

module.exports = app;
