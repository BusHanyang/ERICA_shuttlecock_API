const express = require('express')
const bodyParser = require('body-parser')
const port = 3000
const app = express()

/* middle ware */
app.use(express.static(__dirname + '/public'))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET') // POST, PUT, DELETE 는 구현하지 않음.
    res.header('Access-Control-Allow-Headers', 'content-type')
    next()
})

/* body-parser */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* router */
app.use(['/semester/week/giksa', '/semester/weekend/giksa', 'vacation/week/giksa','vacation/weekend/giksa'], require('./router/giksa'))
app.use(['/semester/week/shuttlecock', '/semester/weekend/shuttlecock', 'vacation/week/shuttlecock', 'vacation/weekend/shuttlecock'], require('./router/shuttlecock'))
app.use(['/semester/week/subway', '/semester/weekend/subway', 'vacation/week/subway', 'vacation/weekend/subway'], require('./router/subway'))
app.use(['/semester/week/yesulin', '/semester/weekend/yesulin', 'vacation/week/yesulin', 'vacation/weekend/yesulin'], require('./router/yesulin'))
app.use((req, res, next) => {
    next(createError(404))
})

app.use((err, req, res, next) => {
        res.status(404)
        res.json({ errorcode: '404' })
})

/* server */
app.listen(port, function () {
    console.log('listening on port : ' + port)
})
