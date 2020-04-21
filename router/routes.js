const util = require("../common");
const fs = require("fs");
const path = require("path");

/* router */
module.exports = function(app) {
  /* full path */
  app.use("/:daykind/:isWeek/:where", Validation);

  /* short path */
  app.use("/:where", halt, Validation);

  /* error handle */
  app.use("*", (req, res, next) => {
    next({ errorcode: "404" });
  });

  app.use((err, req, res, next) => {
    console.log(err);
    res.status(404);
    res.json(err);
  });
};

function halt(req, res, next) {
  let isHalt = util.isHalt();
  if (isHalt == "halted") {
    res.status(200).json({ status: "Halt" });
    return false;
  } else {
    next();
  }
}

function Validation(req, res, next) {
  let {
    daykind = util.getDateKind(),
    isWeek = util.getDayKind(),
    where
  } = req.params;

  if (
    (daykind == "semester" ||
      daykind == "vacation" ||
      daykind == "vacation_session") &&
    (isWeek == "week" || isWeek == "weekend")
  ) {
    sendResult(daykind, isWeek, where, res, next);
  } else {
    next({ error: "Incorrect column1" });
  }
}

function sendResult(daykind, isWeek, where, res, next) {
  let pre;
  if (where == "giksa") {
    pre = "Residence_";
  } else if (where == "shuttlecock_i") {
    pre = "Shuttlecock_I_";
  } else if (where == "shuttlecock_o") {
    pre = "Shuttlecock_O_";
  } else if (where == "subway") {
    pre = "Subway_";
  } else if (where == "yesulin") {
    pre = "YesulIn_";
  } else {
    next({ error: "Incorrect column2" });
  }

  fs.readFile(
    path.join(
      __dirname,
      "../timetable",
      daykind,
      isWeek,
      pre + isWeek + ".json"
    ),
    (err, data) => {
      if (err) next({ error: "Incorrect column3" });
      try {
        data = JSON.parse(data);
        res.json(data[pre.toLowerCase() + isWeek]);
      } catch (err) {
        next({ error: "Incorrect column4" });
      }
    }
  );
}
