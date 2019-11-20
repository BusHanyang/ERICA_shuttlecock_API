const express = require("express");
const moment = require("moment");
const https = require('https')
const fs = require("fs");
const http = require("http");
// const port = 3000;
const app = express();

//FOR GITHUB ACTIONS CI TEST
if (process.env.cert_secret){
  var options = {
    key: process.env.priv,
    cert: process.env.cert
  };

//IF RUN IN RELEASE 
} else {
  /*https*/
  var options = {
    key: fs.readFileSync('ssl/privkey.pem'),
    cert: fs.readFileSync('ssl/cert.pem')
  };

}


/*load setting value from json file*/
const data = JSON.parse(fs.readFileSync("settings.json", "UTF-8"));
const now = moment().format("YYYY-MM-DD");


/*Functions about define datekind and daykind to make URL query string. */
function getKind() {
  const semester = data.calendar[0].semester;
  const vacation_session = data.calendar[1].vacation_session;
  const vacation = data.calendar[2].vacation;

  if (moment(now).isBetween(semester.start, semester.end)) {
    return "semester";
  } else if (
    moment(now).isBetween(vacation_session.start, vacation_session.end)
  ) {
    return "vacation_session";
  } else if (moment(now).isBetween(vacation.start, vacation.end)) {
    return "vacation";
  } else {
    return "error";
  }
}

function getDayKind() {
  switch (moment().format("dddd")) {
    case "Sunday":
      return "weekend";
    case "Saturday":
      return "weekend";
    default:
      return "week";
  }
}


const daykind = getDayKind();
const datekind = getKind();


/*middle ware*/
app.use(express.static(__dirname + "/public"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET"); //POST, PUT, DELETE 는 구현하지 않음.
  res.header("Access-Control-Allow-Headers", "content-type");
  next();
});


/* router */

/*학기중*/
app.use(
  [
    "/" + datekind + "/" +  daykind + "/giksa",
    "/" + datekind + "/" +  daykind + "/giksa",
    "/" + datekind + "/" +  daykind + "/giksa",
    "/" + datekind + "/" +  daykind + "/giksa"
  ],
  require("./router/giksa")
);
app.use(
  [
    "/" + datekind + "/" +  daykind + "/shuttlecock_i",
    "/" + datekind + "/" +  daykind + "/shuttlecock_i",
    "/" + datekind + "/" +  daykind + "/shuttlecock_i",
    "/" + datekind + "/" +  daykind + "/shuttlecock_i"
  ],
  require("./router/shuttlecock_i")
);
app.use(
  [
    "/" + datekind + "/" +  daykind + "/shuttlecock_o",
    "/" + datekind + "/" +  daykind + "/shuttlecock_o",
    "/" + datekind + "/" +  daykind + "/shuttlecock_o",
    "/" + datekind + "/" +  daykind + "/shuttlecock_o"
  ],
  require("./router/shuttlecock_o")
);
app.use(
  [
    "/" + datekind + "/" +  daykind + "/subway",
    "/" + datekind + "/" +  daykind + "/subway",
    "/" + datekind + "/" +  daykind + "/subway",
    "/" + datekind + "/" +  daykind + "/subway"
  ],
  require("./router/subway")
);
app.use(
  [
    "/" + datekind + "/" +  daykind + "/yesulin",
    "/" + datekind + "/" +  daykind + "/yesulin",
    "/" + datekind + "/" +  daykind + "/yesulin",
    "/" + datekind + "/" +  daykind + "/yesulin"
  ],
  require("./router/yesulin")
);

/*방학중 - 계절학기*/
app.use(
  [
    "/" + datekind + "/" +  daykind + "/giksa",
    "/" + datekind + "/" +  daykind + "/giksa",
    "/" + datekind + "/" +  daykind + "/giksa",
    "/" + datekind + "/" +  daykind + "/giksa"
  ],
  require("./router/giksa")
);
app.use(
  [
    "/" + datekind + "/" +  daykind + "/shuttlecock_i",
    "/" + datekind + "/" +  daykind + "/shuttlecock_i",
    "/" + datekind + "/" +  daykind + "/shuttlecock_i",
    "/" + datekind + "/" +  daykind + "/shuttlecock_i"
  ],
  require("./router/shuttlecock_i")
);
app.use(
  [
    "/" + datekind + "/" +  daykind + "/shuttlecock_o",
    "/" + datekind + "/" +  daykind + "/shuttlecock_o",
    "/" + datekind + "/" +  daykind + "/shuttlecock_o",
    "/" + datekind + "/" +  daykind + "/shuttlecock_o"
  ],
  require("./router/shuttlecock_o")
);
app.use(
  [
    "/" + datekind + "/" +  daykind + "/subway",
    "/" + datekind + "/" +  daykind + "/subway",
    "/" + datekind + "/" +  daykind + "/subway",
    "/" + datekind + "/" +  daykind + "/subway"
  ],
  require("./router/subway")
);
app.use(
  [
    "/" + datekind + "/" +  daykind + "/yesulin",
    "/" + datekind + "/" +  daykind + "/yesulin",
    "/" + datekind + "/" +  daykind + "/yesulin",
    "/" + datekind + "/" +  daykind + "/yesulin"
  ],
  require("./router/yesulin")
);

/*방학중*/
app.use(
  [
    "/" + datekind + "/" +  daykind + "/giksa",
    "/" + datekind + "/" +  daykind + "/giksa",
    "/" + datekind + "/" +  daykind + "/giksa",
    "/" + datekind + "/" +  daykind + "/giksa"
  ],
  require("./router/giksa")
);
app.use(
  [
    "/" + datekind + "/" +  daykind + "/shuttlecock_i",
    "/" + datekind + "/" +  daykind + "/shuttlecock_i",
    "/" + datekind + "/" +  daykind + "/shuttlecock_i",
    "/" + datekind + "/" +  daykind + "/shuttlecock_i"
  ],
  require("./router/shuttlecock_i")
);
app.use(
  [
    "/" + datekind + "/" + daykind + "/shuttlecock_o",
    "/" + datekind + "/" + daykind + "/shuttlecock_o",
    "/" + datekind + "/" + daykind + "/shuttlecock_o",
    "/" + datekind + "/" + daykind + "/shuttlecock_o"
  ],
  require("./router/shuttlecock_o")
);
app.use(
  [
    "/" + datekind + "/" +  daykind + "/subway",
    "/" + datekind + "/" +  daykind + "/subway",
    "/" + datekind + "/" +  daykind + "/subway",
    "/" + datekind + "/" +  daykind + "/subway"
  ],
  require("./router/subway")
);
app.use(
  [
    "/" + datekind + "/" +  daykind + "/yesulin",
    "/" + datekind + "/" +  daykind + "/yesulin",
    "/" + datekind + "/" +  daykind + "/yesulin",
    "/" + datekind + "/" +  daykind + "/yesulin"
  ],
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
