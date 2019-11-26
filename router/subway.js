const express = require('express')
const path = require('path')
const router = express.Router()
const fs = require('fs')
const func = require('../common')


function urlParse (urlstr) {
  var urlArr = urlstr.split('/')
  return urlArr
}

var datekind = "";
var daykind = "";



router.get('/', (req, res) => {
  // 접근 url 은 항상 "학기,방학/주중,주말/정류장 종류 의 형태로 들어옴."
  var urlArr = urlParse(req.originalUrl)

      //Full Path로 접근 한 경우 - 기존 urlArr 배열 그대로 활용.
  datekind = urlArr[1]
  daykind = urlArr[2]

  if (urlArr.length == 2){ //Short Path 로 접근 한 경우
    datekind = func.getDateKind()
    daykind = func.getDayKind()
  }

  switch (datekind) {
    case 'semester': // 학기중
      if (daykind == 'week') { // 주중
        var jsonPath = path.join(__dirname, '..', 'timetable', 'semester', 'week', 'Subway_week.json')
      } else if (daykind == 'weekend') { // 주말
        var jsonPath = path.join(__dirname, '..', 'timetable', 'semester', 'weekend', 'Subway_weekend.json')
      }
      break
    case 'vacation': // 방학중
      if (daykind == 'week') { // 주중
        var jsonPath = path.join(__dirname, '..', 'timetable', 'vacation', 'week', 'Subway_week.json')
      } else if (daykind == 'weekend') { // 주말
        var jsonPath = path.join(__dirname, '..', 'timetable', 'vacation', 'weekend', 'Subway_weekend.json')
      }
      break
    case 'vacation_session': // 방학중-계절학기
      if (daykind == 'week') { // 주중
        var jsonPath = path.join(__dirname, '..', 'timetable', 'vacation_session', 'week', 'Subway_week.json')
      } else if (daykind == 'weekend') { // 주말
        var jsonPath = path.join(__dirname, '..', 'timetable', 'vacation_session', 'weekend', 'Subway_weekend.json')
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
  if(daykind == 'week'){ //주중일 경우
    return res.json(jsondata.subway_week)
  } else { //주말일 경우
    return res.json(jsondata.subway_weekend)
  } 
})

module.exports = router
