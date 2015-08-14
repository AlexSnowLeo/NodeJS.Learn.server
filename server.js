// http://127.0.0.1/echo?message=Hello -> Hello

var http = require('http');
var url = require('url');

var server = new http.Server();

server.on('request', function (req, res) {
    console.log(req.method, req.url);

    var urlParsed = url.parse(req.url, true);
    console.log(urlParsed);

    if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
        //res.writeHead(200, "OK", {'Cache-control': 'no-cache'}); // немедленный вывод заголовка браузеру, не ожидая ближайшего вывода
        res.setHeader('Cache-control', 'no-cache'); // нормальный вывод заголовка
        res.end(urlParsed.query.message);
    } else {
        res.statusCode = 404;
        res.end("Page not found");
    }
});

server.listen(1337, '127.0.0.1');