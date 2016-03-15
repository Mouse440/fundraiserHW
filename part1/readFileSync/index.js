var http = require('http');
var fs = require('fs');
var file = fs.readFileSync('./index.html', 'utf8');

var requestListener = function (req, res) {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(file);
                        res.end();
                }
var server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080);
