const express = require("express");
const https = require("https");
const fs = require("fs");
const http = require("http");
// const port = 3000;
const app = express();
const func = require("./common");

//FOR GITHUB ACTIONS CI TEST
if (process.env.cert_secret) {
  var options = {
    key: process.env.priv,
    cert: process.env.cert
  };

  //IF RUN IN RELEASE
} else {
  /*https*/
  var options = {
    key: fs.readFileSync("ssl/privkey.pem"),
    cert: fs.readFileSync("ssl/cert.pem")
  };
}

const daykind = func.getDayKind();
const datekind = func.getDateKind();
/*middle ware*/
app.use(express.static(__dirname + "/public"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET"); //POST, PUT, DELETE 는 구현하지 않음.
  res.header("Access-Control-Allow-Headers", "content-type");
  next();
});

/* router */
app.use("/" + datekind + "/" + daykind + "/giksa", require("./router/giksa"));
app.use(
  "/" + datekind + "/" + daykind + "/shuttlecock_i",
  require("./router/shuttlecock_i")
);
app.use(
  "/" + datekind + "/" + daykind + "/shuttlecock_o",
  require("./router/shuttlecock_o")
);
app.use("/" + datekind + "/" + daykind + "/subway", require("./router/subway"));
app.use(
  "/" + datekind + "/" + daykind + "/yesulin",
  require("./router/yesulin")
);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(404);
  res.json({ errorcode: "404" });
});

/*server*/
// Create an HTTP service.
http.createServer(app).listen(3000);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(443);

module.exports = app;
