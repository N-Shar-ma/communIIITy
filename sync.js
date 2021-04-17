//sync questions with other servers. run every 4-8 hours ig

const fs = require('fs');
const readline = require('readline');
var https = require('https');

makeGetRequestAndUpdateDb(url) {
 var options = { 
  hostname: url, 
  port: 4433, 
  path: '/', 
  method: 'GET', 
  key: fs.readFileSync('client1-key.pem'), 
  cert: fs.readFileSync('client1-crt.pem'), 
  ca: fs.readFileSync('ca-crt.pem') };

  var req = https.request(options, function(res) { 
    res.on('data', function(data) { 
        //TODO nehal, read this json and put it into db 
      }); 
  });
  req.end();
  req.on('error', function(e) { 
    console.error(e); 
  });

}

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    console.log(`Syncing: ${line}`);
    makeGetRequestAndUpdateDb(line);
  }
}

processLineByLine();
