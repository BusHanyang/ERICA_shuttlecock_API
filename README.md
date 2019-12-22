# Shuttlecock_API
## 한양대학교 ERICA캠퍼스 셔틀버스 API

[![Build Status](http://server.jaram.net:5903/buildStatus/icon?job=shuttlecock-api)](http://server.jaram.net:5903/job/shuttlecock-api/) ![API Status](https://img.shields.io/website?down_color=lightgrey&down_message=offline&up_color=blue&up_message=online&url=https%3A%2F%2Fhyu-shuttlebus.appspot.com%2Fsubway) ![license](https://img.shields.io/badge/license-GPL3.0-important)

*Jenkins 실시간 빌드 상태는 위 뱃지를 클릭해서 확인하실 수 있습니다.*

* 이 프로젝트는 현재 Google App Engine 에서 구동되고 있습니다.
* [Devlog](https://github.com/CXZ7720/shuttlecock_API/wiki/devlog) 및 [서비스 구조도](https://github.com/CXZ7720/shuttlecock_API/wiki/Service_Diagram)는 위키를 참조하시길 바랍니다.
* API 이용관련 문의는 kygha7205@naver.com 으로 연락주시기 바랍니다.

### 0. 설치방법
PR 은 언제나 환영합니다!!
* 이 프로젝트를 실행하기 위해서는 Node.js 와 Yarn 이 설치되어야 합니다.
> Node.js : [링크](https://nodejs.org/en/download/) <br>
> Yarn : [링크](https://yarnpkg.com/en/docs/install)

1. 이 레포지토리를 컴퓨터에 클론합니다.
`git clone https://github.com/CXZ7720/ERICA_shuttlecock_API.git`

2. 클론한 폴더로 이동 후 터미널에 `yarn` 명령어를 입력해 필수 패키지들을 설치합니다.

3. 패키지 설치가 완료되면 `yarn start` 를 통해 API 서버를 가동시킬 수 있습니다.

4. 이 프로젝트는 **Mocha.js** 와 **Chai** 를 이용한 Test 를 지원합니다. `yarn test` 명령어를 통해 API 가 정상적으로 서비스 되고 있는지 확인할 수 있습니다.

5. 디렉토리 및 파일 설명

|이름|종류|용도 및 기능|
|---|---|---|
|`.github`|폴더|Github Actions 테스트를 위한 스크립트가 들어 있습니다.|
|`router`|폴더|URI 쿼리 스트링에 따른 라우팅 로직 파일들이 들어있는 폴더 입니다.<br>각 정류장별로 분리되어 있습니다.|
|`timetable`|폴더|시간표 json 데이터가 들어있는 폴더 입니다.<br> 분기별, 날짜별로 구분되어 있습니다.|
|`.dockerignore`<br>`.gitignore`<br>`.gcloudignore`|파일|각각 Docker, Git, Google Cloud Platform 에 배포시 무시될 파일들이 선언되어 있습니다.|
|`.prettierrc`|파일|VSCode 에서 사용되는 JS Lint 를 위한 코드스타일이 정의되어있습니다.|
|`app.yaml`|파일|Google App Engine 에 배포하기 위한 설정파일입니다.|
|`common.js`|파일|라우팅 로직에서 이용되는 함수들이 정의되어 있습니다.|
|`Dockerfile`|파일|도커 이미지를 만들기 위한 스크립트 입니다.|
|`index.spec.js`|파일|Mocha.js 를 이용한 자동화 테스트의 절차가 담긴 파일입니다.|
|`LICENSE.md`|파일|이 프로젝트의 라이센스가 선언되어 있습니다.|
|`package.json`|파일|Nodejs 프로젝트의 로직이 정의되어 있습니다.|
|`settings.json`|파일|시간표의 종류를 판단할 때 근거로 사용되는 파일입니다.<br>정규학기의 기간, 계절학기의 기간, 방학의 기간이 정의되어 있습니다.|


### 1. 사용법

URL 입력을 통해 정류소의 시간표를 JSON 형태로 전달받습니다.
URL 의 구성은 다음과 같습니다.<br>
**Full Path** : `/시간표종류/일자구분/정류소종류`
**Short Path** : `/정류소종류`

*Full Path* 접근방식으로 특정 기간, 특정 정류소의 시간표를 확인할 수 있습니다.
*Short Path* 접근 방식으로는 조회 당시에 해당 정류장의 시간표를 가져옵니다.
<br>
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

* 학기중 평일 기숙사방향 셔틀콕의 시간표를 불러올 경우. *(Full path)*<br>

  `/semester/week/shuttlecock_i`


* 학기중 주말 기숙사의 시간표를 불러올 경우. *(Full path)*<br>

  `/semester/weekend/giksa`<br>

* 현재 기간의 예술인아파트 시간표를 불러올 경우. *(Short path)*
`/yesulin`


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
|`R`|기숙사행|
|`NA`|정보없음|


### 3. 정규학기, 계절학기, 방학 의 구분
[공식 학사일정](https://www.hanyang.ac.kr/web/www/cal_academic)에 따라 `/settings.json` 에 각 일정의 시작일과 종료일을 정의 해 두었습니다.

Short Path 를 통해 API를 호출 할 경우, 이 파일에 기록된 일자를 기준으로 판별하여 데이터를 반환합니다.


### 4. 시간표 정확도 및 출처 관련
이 시간표 데이터는 한양대학교ERICA 캠퍼스 총무관리처에서 배포한 **"한양대학교ERICA 셔틀버스 운행노선 & 시간표"** 에 기준하여 작성되었습니다.

현재 JSON 데이터의 기준은 19.09.23 에 배포된 문서를 기반으로 하여 작성되었으며 원본은 `timetable/general.pdf`와 `timetable/source.pdf` 에서 확인하실 수 있습니다.

2019년 2학기에 개최된 '한양대학교ERICA 총학생회 정기확대운영위원회' 의 [보고내용](https://www.facebook.com/hanyangericagsa/posts/1783134645318881)에 따르면 *평소에는 시간표를 따르되, 수요가 급증하는 시간대인 등, 하교시에는 유동적으로 배차* 하도록 되어있습니다. 때문에 총무관리처에서 배포한 시간표를 기준으로 작성된 이 API가 절대적인 척도가 되지 못함을 미리 밝힙니다.
