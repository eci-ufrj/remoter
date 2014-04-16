var http = require('http'),
    fs = require('fs');

var port = process.env.PORT || 5000;
fs.readFile('./server/templates/video/index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(port);
});