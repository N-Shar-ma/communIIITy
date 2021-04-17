var fs = require('fs'); 
var https = require('https');

var options = { 
    key: fs.readFileSync('server-key.pem'), 
    cert: fs.readFileSync('server-crt.pem'), 
    ca: fs.readFileSync('ca-crt.pem'), 
    requestCert: true, 
    rejectUnauthorized: true
};

https.createServer(options, function (req, res) { 
    console.log(new Date()+' '+ 
        req.connection.remoteAddress+' '+ 
        req.socket.getPeerCertificate().subject.CN+' '+ 
        req.method+' '+req.url); 
    res.writeHead(200); 
    res.end(getUpdateData()); 
}).listen(4433);

getUpdateData() {
	// TODO nehal this should return questions/answers in past day
	//  upvoted more than 42 times ins json format
}