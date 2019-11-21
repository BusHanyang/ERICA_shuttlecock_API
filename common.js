const moment = require("moment");
const fs = require("fs");


/*load setting value from json file*/
const data = JSON.parse(fs.readFileSync("./settings.json", "UTF-8"));
const now = moment().format("YYYY-MM-DD");

/*Functions about define datekind and daykind to make URL query string. */
function getDateKind() {
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

module.exports.getDayKind = getDayKind
module.exports.getDateKind = getDateKind
