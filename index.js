const express = require("express");
const http = require("http");
const app = express();
const helmet = require('helmet')

app.use(helmet())
app.use(helmet.noCache())

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
app.use(['/semester/week/giksa', '/semester/weekend/giksa', 'vacation/week/giksa', 'vacation/weekend/giksa', '/giksa'], require('./router/giksa'))
app.use(['/semester/week/shuttlecock_i', '/semester/weekend/shuttlecock_i', 'vacation/week/shuttlecock_i', 'vacation/weekend/shuttlecock_i', '/shuttlecock_i'], require('./router/shuttlecock_i'))
app.use(['/semester/week/shuttlecock_o', '/semester/weekend/shuttlecock_o', 'vacation/week/shuttlecock_o', 'vacation/weekend/shuttlecock_o', '/shuttlecock_o'], require('./router/shuttlecock_o'))
app.use(['/semester/week/subway', '/semester/weekend/subway', 'vacation/week/subway', 'vacation/weekend/subway', '/subway'], require('./router/subway'))
app.use(['/semester/week/yesulin', '/semester/weekend/yesulin', 'vacation/week/yesulin', 'vacation/weekend/yesulin', '/yesulin'], require('./router/yesulin'))

/*방학중 - 계절학기*/
app.use(['/vacation_session/week/giksa', '/vacation_session/weekend/giksa', 'vacation/week/giksa', 'vacation/weekend/giksa'], require('./router/giksa'))
app.use(['/vacation_session/week/shuttlecock_i', '/vacation_session/weekend/shuttlecock_i', 'vacation/week/shuttlecock_i', 'vacation/weekend/shuttlecock_i'], require('./router/shuttlecock_i'))
app.use(['/vacation_session/week/shuttlecock_o', '/vacation_session/weekend/shuttlecock_o', 'vacation/week/shuttlecock_o', 'vacation/weekend/shuttlecock_o'], require('./router/shuttlecock_o'))
app.use(['/vacation_session/week/subway', '/vacation_session/weekend/subway', 'vacation/week/subway', 'vacation/weekend/subway'], require('./router/subway'))
app.use(['/vacation_session/week/yesulin', '/vacation_session/weekend/yesulin', 'vacation/week/yesulin', 'vacation/weekend/yesulin'], require('./router/yesulin'))


/*방학중*/
app.use(['/vacation/week/giksa', '/vacation/weekend/giksa', 'vacation/week/giksa', 'vacation/weekend/giksa'], require('./router/giksa'))
app.use(['/vacation/week/shuttlecock_i', '/vacation/weekend/shuttlecock_i', 'vacation/week/shuttlecock_i', 'vacation/weekend/shuttlecock_i'], require('./router/shuttlecock_i'))
app.use(['/vacation/week/shuttlecock_o', '/vacation/weekend/shuttlecock_o', 'vacation/week/shuttlecock_o', 'vacation/weekend/shuttlecock_o'], require('./router/shuttlecock_o'))
app.use(['/vacation/week/subway', '/vacation/weekend/subway', 'vacation/week/subway', 'vacation/weekend/subway'], require('./router/subway'))
app.use(['/vacation/week/yesulin', '/vacation/weekend/yesulin', 'vacation/week/yesulin', 'vacation/weekend/yesulin'], require('./router/yesulin'))

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(404);
  res.json({ errorcode: "404" });
});

/*server*/
// Create an HTTP service.
http.createServer(app).listen(8080);


module.exports = app;
