# Shuttlecock_API
## 한양대학교 ERICA캠퍼스 셔틀버스 API

[![Build Status](http://jenkins.jaram.net/job/shuttlecock-api/badge/icon)](http://jenkins.jaram.net/job/shuttlecock-api/) ![API Status](https://img.shields.io/website?down_color=lightgrey&down_message=dead&label=API&up_color=blue&up_message=Online&url=https%3A%2F%2Fshuttle.jaram.net%2Fsemester%2Fweek%2Fgiksa) ![license](https://img.shields.io/badge/license-GPL3.0-important)


### 1. 사용법

URL 입력을 통해 정류소의 시간표를 JSON 형태로 전달받습니다.
URL 의 구성은 다음과 같습니다.<br>
`/시간표종류/일자구분/정류소종류`<br><br>
각 구분에 대한 명시는 아래 항목을 참조하세요.
<br>
* 1) 시간표 종류

|코드네임|구분|
|---|---|
|`semester`|학기 중|
|`vacation_session`|계절학기|
|`vacation`|방학|
<br>

* 2) 일자 구분

|코드네임|구분|
|---|---|
|`week`|주중 시간표|
|`weekend`|주말 시간표|
<br>

* 3) 정류소 종류

|코드네임|정류소|
|---|---|
|`giksa`|기숙사(창의인재원)|
|`shuttlecock_i`|셔틀콕 - 기숙사 방향|
|`shuttlecock_o`|셔틀콕 - 한대앞역/예술인 방향|
|`subway`|한대앞역|
|`yesulin`|예술인아파트|
<br>
<br>
따라서 조합된 URL 은 다음과 같습니다.

* 학기중 평일 기숙사방향 셔틀콕의 시간표를 불러올 경우<br>

  `/semester/week/shuttlecock_i`


* 학기중 주말 기숙사의 시간표를 불러올 경우<br>

  `/semester/weekend/giksa`<br>


### 2. JSON 파일의 구성

json 데이터의 구성은 다음과 같이 이루어져 있습니다.

```
[
  { "time": "07:50", "type": "C" },
  { "time": "08:00", "type": "DH" },
  { "time": "08:10", "type": "DH" },
  { "time": "08:15", "type": "DH" },
  { "time": "08:20", "type": "DH" },
  { "time": "08:20", "type": "DY" },
  -중략-
  { "time": "22:30", "type": "C" },
  { "time": "22:45", "type": "C" },
  { "time": "23:00", "type": "C" }
]

```
쿼리 결과로 리턴되는 JSON 파일은 두개의 키&밸류 쌍으로 이루어져 있습니다.

|key|의미|
|---|---|
|`time`|시간(도착 기준)|
|`type`|버스 종류|


버스의 종류`type`는 다시 아래와 같이 구분됩니다.

|값|구분|
|---|---|
|`C`|순환노선|
|`DH`|한대앞역 행|
|`DY`|예술인아파트 행|
|`(공백)`|셔틀콕 회송, 기숙사행|
> 셔틀콕회송 및 기숙사행의 경우 예술인 아파트나 한대앞역에서 출발하여 셔틀콕으로 돌아오는 노선 및 셔틀콕을 출발해 기숙사로 들어가는 노선을 의미합니다.<br>이와 같은 운행은 목적지가 명확하여 따로 구분문자를 부여하지 않았습니다.


### 3. 시간표 정확도 및 출처 관련
이 시간표 데이터는 한양대학교ERICA 캠퍼스 총무관리처에서 배포한 **"한양대학교ERICA 셔틀버스 운행노선 & 시간표"** 에 기준하여 작성되었습니다.

현재 JSON 데이터의 기준은 19.09.23 에 배포된 문서를 기반으로 하여 작성되었으며 원본은 `timetable/general.pdf`와 `timetable/source.pdf` 에서 확인하실 수 있습니다.

2019년 2학기에 개최된 '한양대학교ERICA 총학생회 정기확대운영위원회' 의 [보고내용](https://www.facebook.com/hanyangericagsa/posts/1783134645318881)에 따르면 *평소에는 시간표를 따르되, 수요가 급증하는 시간대인 등, 하교시에는 유동적으로 배차* 하도록 되어있습니다. 때문에 총무관리처에서 배포한 시간표를 기준으로 작성된 이 API가 절대적인 척도가 되지 못함을 미리 밝힙니다.
