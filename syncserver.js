var fs = require('fs'); 
var https = require('https');
const Question = require('./models/question');
const Answer = require('./models/answer');

var options = { 
    key: fs.readFileSync('server-key.pem'), 
    cert: fs.readFileSync('server-crt.pem'), 
    ca: fs.readFileSync('ca-crt.pem'), 
    requestCert: true, 
    rejectUnauthorized: true
};

https.createServer(options, async function (req, res) { 
    console.log(new Date()+' '+ 
        req.connection.remoteAddress+' '+ 
        req.socket.getPeerCertificate().subject.CN+' '+ 
        req.method+' '+req.url); 
    res.writeHead(200); 
    res.end(await getUpdateData()); 
}).listen(4433);

async function getUpdateData() {
    const yesterday = new Date(new Date().getTime() - (24 * 60 * 60 *1000))
    const questions = await Question.find({ 
        createdAt: { $gte : yesterday }, 
        voteCount: { $gte : 42 } 
    }).exec()
    const answers = await Answer.find({ 
        createdAt: { $gte : yesterday }, 
        voteCount: { $gte : 42 } 
    }).exec()
    return { questions, answers }
}