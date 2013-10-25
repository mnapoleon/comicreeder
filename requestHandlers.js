var fs = require("fs");
var request = require("request");
var querystring = require("querystring");
var Parse = require("parse-api").Parse;

var APP_ID = 'uKoPYsEPCuxyfZT3M5lyTytsiyZij0RHCSY1VuZ4';
var MASTER_KEY = '3Vszj1HJQo488dfXmDZi32fKFczwn7dqrjoyRydQ';

var parseApp = new Parse(APP_ID, MASTER_KEY);

function start(req, resp, postData) {
    "use strict";
    console.log("req handler 'start' was called.");

    if (req.method === 'GET') {
        var s = fs.createReadStream("./comicEntryForm.html");
        s.on('error',function() {
            resp.writeHead(404);
            resp.end();
        });
        s.once('fd', function() {
          resp.writeHead(200);
        });
        s.pipe(resp);
    }
}

function saveComic(req, resp, postData) {
  console.log("Request handler for 'saveComic' was called.");
  console.log("PData: " + postData);
  var cName = querystring.parse(postData).comicName;
  var wName = querystring.parse(postData).writerName;
  var issueNo = querystring.parse(postData).issueNo;
  var pub = querystring.parse(postData).publisher;
  console.log(cName + ":" + wName + ":" + issueNo + ":" + pub);
  parseApp.insert('Comics', {comicName:cName, writer:wName, publisher:pub, issue:issueNo},
    function(err, response) {
      console.log(response);
      console.log(err);
    });
  resp.writeHead(200, {"Content-Type": "text/plain"});
  resp.write("Comic saved " + querystring.parse(postData).comicName);
  resp.end();
}

exports.start = start;
exports.saveComic = saveComic;