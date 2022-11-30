const express = require('express')
const app = express()
// 禁用 Express 的 X-Powered-By 头信息
app.disable('x-powered-by')
// 设置 handlebars 视图引擎
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' })
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.set('port', process.env.PORT || 3000)

app.use(express.static(__dirname + '/public'))

// 页面测试
app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1'
    next()
})

// 路由
app.get('/', function (req, res) {
    res.render('home')
})
var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
]
app.get('/about', function (req, res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {
        fortune: randomFortune,
        pageTestScript: '/qa/tests-about.js'
    })
})
app.get('/tours/hood-river', function (req, res) {
    res.render('tours/hood-river')
})
app.get('/tours/request-group-rate', function (req, res) {
    res.render('tours/request-group-rate')
})
// 查看浏览器发送请求头的信息
app.get('/headers', function (req, res) {
    res.set('Content-Type', 'text/plain')
    var s = ''
    for (var name in req.headers) s += name + ': ' + req.headers[name] + '\n'
    res.send(s)
})
// 404 catch-all 处理器（中间件）
app.use(function (req, res, next) {
    res.status(404)
    res.render('404')
});
// 500 错误处理器（中间件）
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500)
    res.render('500')
});
app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.')
})