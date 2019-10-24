const express = require('express')
const path = require('path')
const router = express.Router()
const fs = require('fs')

function urlParse (urlstr) {
  var urlArr = urlstr.split('/')
  return urlArr
}

router.get('/', (req, res) => {
  // 접근 url 은 항상 "학기,방학/주중,주말/정류장 종류 의 형태로 들어옴."
  var urlArr = urlParse(req.originalUrl)

  switch (urlArr[1]) {
    case 'semester': // 학기중
      if (urlArr[2] == 'week') { // 주중
        var jsonPath = path.join(__dirname, '..', 'timetable', 'semester', 'week', 'Shuttlecock_week.json')
      } else if (urlArr[2] == 'weekend') { // 주말
        var jsonPath = path.join(__dirname, '..', 'timetable', 'semester', 'weekend', 'Shuttlecock_weekend.json')
      }
      break
    case 'vacation': // 방학중
      if (urlArr[2] == 'week') { // 주중
        var jsonPath = path.join(__dirname, '..', 'timetable', 'vacation', 'week', 'Shuttlecock_week.json')
      } else if (urlArr[2] == 'weekend') { // 주말
        var jsonPath = path.join(__dirname, '..', 'timetable', 'vacation', 'weekend', 'Shuttlecock_weekend.json')
      }
      break
    case 'vacation_session': // 방학중
      if (urlArr[2] == 'week') { // 주중
        var jsonPath = path.join(__dirname, '..', 'timetable', 'vacation_session', 'week', 'Shuttlecock_week.json')
      } else if (urlArr[2] == 'weekend') { // 주말
        var jsonPath = path.join(__dirname, '..', 'timetable', 'vacation_session', 'weekend', 'Shuttlecock_weekend.json')
      }
      break
    default:
      break
  }

  try {
    var data = fs.readFileSync(jsonPath, 'UTF-8')
  } catch (err) {
    console.log(err)
    return res.status(404).json({ error: 'Incorrect column' })
  }
  const jsondata = JSON.parse(data)
  if (urlArr[2] == 'week') { //주중일 경우
    return res.json(jsondata.shuttlecock_o_week)
  } else { //주말일 경우
    return res.json(jsondata.shuttlecock_o_weekend)
  }
})

module.exports = router
