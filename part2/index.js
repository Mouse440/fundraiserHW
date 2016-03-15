var http = require('http');
var fs = require('fs');

var requestListener = function (req, res) {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                	fs.open('./index.html','r',function(err, data){
			        fs.fstat(data, function(err, meta){
                			var s = meta.size,
                    			chunkSize = 512,
                    			buffer = new Buffer(s),
                    			byteRead = 0;
               		 		while (byteRead < s) {
                        			if((byteRead + chunkSize) > s) {
                                			chunkSize = (s - byteRead); //last case when there is less than chunkSize byte left
                        			}
                        			fs.read(data, buffer, byteRead, chunkSize, byteRead); //read a chunk
                        			byteRead += chunkSize;
                			}
					res.write(buffer.toString('utf8', 0, s));
                                	res.end();       				 
				});
			});        
                }

var server = http.createServer(requestListener);
server.listen(process.env.PORT || 8080);
